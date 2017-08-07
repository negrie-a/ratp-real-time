import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  station = '';



  constructor() {
    this.getTimeByStationName("ROBINSON")
  }

  getTimeByStationName(name) {
    console.log(name)
    this.station = name
  }
}
