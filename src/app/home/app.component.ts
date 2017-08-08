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


  constructor(private ratp: RATPService) {
    let station = "Bagneux"
    let type = "RB"

    this.getTimeByStationName(station, type)
    setInterval(() => {
      this.myTimer()
    }, 1000)

    setInterval(() => {
      this.getTimeByStationName(station, type)
    }, 10000)
  }

  getTimeByStationName(name, type) {
    this.title = name
    this.ratp.getStationsInfo(name, type)
    .then((response) => {
      console.log(response)
      this.stations = response.missions
    })
  }

  myTimer() {
    var d = new Date();
    this.time = d.toLocaleTimeString();
  }
}
