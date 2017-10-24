import {Component, Input, OnInit} from '@angular/core';
import {AdminLocation} from '../locations.component';

@Component({
  selector: 'app-admin-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class AdminLocationDetailComponent implements OnInit {

  @Input() currentLocation: AdminLocation;

  constructor() { }

  ngOnInit() {
  }

}
