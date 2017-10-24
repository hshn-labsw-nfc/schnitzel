import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaySession} from '../status.component';

@Component({
  selector: 'app-admin-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class AdminStatusDetailComponent implements OnInit {

  maximized = false;

  @Input() session: PlaySession;

  @Output()
  detailDelete: EventEmitter<string> = new EventEmitter();
  @Output()
  detailMinimize: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.maximized = false;
  }

  ngOnInit() {
  }

  deleteSession() {
    this.detailDelete.emit(this.session.session_id);
  }
  minimize(){
    this.detailMinimize.emit();
  }
}
