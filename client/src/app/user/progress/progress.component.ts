import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SharedSimpleDialogComponent} from '../../shared/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-user-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class UserProgressComponent implements OnInit {

  @Input() progressCount: number;
  @Input() progressDone: number;
  @Output()
  progressOutput: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  abbrechen() {
    const deleteSession = this.dialog.open(SharedSimpleDialogComponent, {data: {
      title: 'Schnitzeljagd löschen',
      message: 'Möchtest du deine aktuelle Schnitzeljagd wirklich (permanent) löschen?',
      button1: 'JA LÖSCHEN',
      button2: 'Abbrechen'
    }});
    deleteSession.afterClosed().subscribe(result => {
      if(result === 'b1') {
        console.log('user deleted session');
        this.progressOutput.emit();
      }
    });
  }
}
