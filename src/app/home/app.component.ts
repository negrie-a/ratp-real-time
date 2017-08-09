import { Component } from '@angular/core';
import { RATPService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  stations = [];
  time = '';
  mission = {}

  constructor(private ratp: RATPService) {
    let station = "Bagneux"
    let type = "RB"

    this.getTimeByStationName(station, type)
    setInterval(() => {
      this.myTimer()
    }, 1000)

    setInterval(() => {
      this.getTimeByStationName(station, type)
    }, 15000)
  }

  getTimeByStationName(name, type) {
    this.title = name
    this.ratp.getStationsInfo(name, type)
    .then((response) => {
      this.stations = response.missions
      for (let i = 0 ; i < response.missions.length ; i++) {
        this.ratp.getMissionInfo(response.missions[i].id, type)
        .then((mission) => {
          let stationIsOnMyRoad = false;
          for (let index = 0; index < mission.stationsStops.length ; index++) {
            if (!this.stations[i].stationsNotServe)
              this.stations[i].stationsNotServe = ""
            if (mission.stations[index].name === name)
              stationIsOnMyRoad = true;
            if (mission.stationsStops[index] === false && stationIsOnMyRoad === true)
              this.stations[i].stationsNotServe += this.stations[i].stationsNotServe === "" ? `${mission.stations[index].name}` : ` - ${mission.stations[index].name}`
          }
        })
      }
    })
  }

  getMissionInfo(id, type) {
    this.ratp.getMissionInfo(id, type)
    .then((response) => {
      this.mission = response
    })
  }

  myTimer() {
    var d = new Date();
    this.time = d.toLocaleTimeString();
  }
}
