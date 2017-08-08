// ./main.js
const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const express = require('express');
const appServer = express();
const soap = require('soap');
// require('electron-reload')(__dirname, {
//   electron: require('${__dirname}/../../node_modules/electron')
// })

let win = null;

require('dotenv').config();

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 1000, height: 600});

    // Specify entry point
    // Specify entry point
    if (process.env.PACKAGE === 'true'){
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        win.loadURL(process.env.HOST);
        win.webContents.openDevTools();
    }

    // Show dev tools
    // Remove this line before distributing
    win.webContents.openDevTools()

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

appServer.get('/', function (req, res) {
    res.status(200).json({"message":'Hello World!'});
});


// ####################
// GET_STATIONS
// ####################

// appServer.get('/stations/:name/id/:id', function (req, res) {
//
//   var url = 'http://localhost:8888/wsiv.wsdl';
//   var args = {
//     "station": {
//       "line": {
//         "id": req.params.id
//       },
//       "name": req.params.name
//     }
//   };
//
//   soap.createClient(url, function(err, client) {
//     if (err) {
//       console.log(err)
//     }
//     client.getStations(args, function(err, result) {
//       if (err) {
//         console.log(err)
//       }
//       console.log(result);
//         res.status(200).json(result);
//     });
//   });
// });

// ####################
// GET_MISSIONS
// ####################

appServer.get('/stations/:name/type/:id', function (req, res) {

    var url = 'http://localhost:8888/wsiv.wsdl';
    var args = {
        "ns1:station": {
            "line": {
                "id": req.params.id
            },
            "name": req.params.name
        },
        "ns1:direction": {
            "sens": req.query.sens || "*"
        }
    };

    soap.createClient(url, function(err, client) {
        if (err) {
            console.log(err)
        }
        client.getMissionsNext(args, function(err, result) {
            if (err) {
                console.log(err)
            }
            var m = {
                missions: result.return.missions
            }
            res.status(200).json(m);
        });
    });
});

appServer.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
