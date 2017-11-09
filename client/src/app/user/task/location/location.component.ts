import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../location';
import {UserLocationCameraPopupComponent} from './location-map-camera-popup/location-map-camera-popup.component';
import {UserLocationMapPopupComponent} from './location-map-popup/location-map-popup.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class UserLocationComponent implements OnInit {
  @Input() location: Location;

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

  }

  openCamera() {
    const d = this.dialog.open(UserLocationCameraPopupComponent, {});
    d.afterClosed().subscribe(result => {
      if((<string>result).indexOf('/tag/') > -1) {
        this.scannedTag(result);
      } else {
        this.snackBar.open('QR Code konnte nicht korrekt gescanned werden',null, {
          duration: 2000,
          horizontalPosition: 'center'
        });
      }
    });
  }

  scannedTag(tag: string): void{
    const suffix = tag.slice(tag.indexOf('/tag/'),tag.length);
    console.log('suffix=',suffix);
    window.open(location.origin+suffix,'_self');
  }

  openMap() {
    const d = this.dialog.open(UserLocationMapPopupComponent, {data: {
      location: this.location
    }});
  }
}
