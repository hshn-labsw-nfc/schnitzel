import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-location-map-popup',
  templateUrl: './location-map-popup.component.html',
  styleUrls: ['./location-map-popup.component.css']
})
export class UserLocationMapPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserLocationMapPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
