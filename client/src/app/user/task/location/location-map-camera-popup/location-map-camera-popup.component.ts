import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {UserLocationMapPopupComponent} from '../location-map-popup/location-map-popup.component';

@Component({
  selector: 'app-user-location-camera-popup',
  templateUrl: './location-map-camera-popup.component.html',
  styleUrls: ['./location-map-camera-popup.component.css']
})
export class UserLocationCameraPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserLocationMapPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
