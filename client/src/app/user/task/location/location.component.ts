import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() location: Location;

  constructor() { }

  ngOnInit() {
  }

}
