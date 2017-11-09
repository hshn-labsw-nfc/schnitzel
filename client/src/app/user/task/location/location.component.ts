import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../location';
import {UserLocationCameraPopupComponent} from './location-map-camera-popup/location-map-camera-popup.component';
import {UserLocationMapPopupComponent} from './location-map-popup/location-map-popup.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class UserLocationComponent implements OnInit {
  @Input() location: Location;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openCamera() {
    const d = this.dialog.open(UserLocationCameraPopupComponent, {});
    d.afterClosed().subscribe(result => {
      if(result.length > 1) {
        // CHANGE URL AND REFRESH, THIS IS A TAG

      }
    });
  }

  openMap() {
    const d = this.dialog.open(UserLocationMapPopupComponent, {data: {
      location: this.location
    }});
  }
}
