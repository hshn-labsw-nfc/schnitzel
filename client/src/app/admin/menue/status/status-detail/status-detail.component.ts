import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaySession} from '../status.component';
import {SharedSimpleDialogComponent} from '../../../../shared/simple-dialog/simple-dialog.component';
import {MatDialog} from '@angular/material';

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

  constructor(public dialog: MatDialog) {
    this.maximized = false;
  }

  ngOnInit() {
  }

  deleteSession() {
    const d = this.dialog.open(SharedSimpleDialogComponent, {data: {
      title: 'Session löschen',
      message: 'Möchtest du wirklich die Session ' + this.session.sessionGroupName  +' löschen?',
      button1: 'Löschen',
      button2: 'Abbrechen'
    }});
    d.afterClosed().subscribe(result => {
      if(result === 'b1') {
        console.log('deleting the detailed session');
        this.detailDelete.emit(this.session.session_id);
      }
    });
  }
  minimize(){
    this.detailMinimize.emit();
  }
}
