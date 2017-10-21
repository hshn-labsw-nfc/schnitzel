import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../location';

@Component({
  selector: 'app-user-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() location: Location;


  constructor() { }

  ngOnInit() {
  }

  getMapImage(): string {
    switch (this.location.getLayer()){
      case -1:{
        return '';
      }
      case 0:{
        return '';
      }
      case 1:{
        return '';
      }
      case 2:{
        return '';
      }
      case 3:{
        return '';
      }
      case 4:{
        return '';
      }
      case 5:{
        return '';
      }
    }
  }
}
