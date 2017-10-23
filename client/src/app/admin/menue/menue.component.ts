import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class AdminMenueComponent implements OnInit {

  @Output()
  menueLogout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
