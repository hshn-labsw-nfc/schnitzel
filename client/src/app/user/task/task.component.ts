import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../question';
import {Location} from '../location';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public mapOpen:boolean;

  @Input() question: Question;
  @Input() location: Location;
  @Input() sessionID: string;
  @Input() currentTask: string;

  constructor() { }

  ngOnInit() {
    this.mapOpen = false;
  }

  isUnsolvedQuiz(): boolean {
    return (this.currentTask !== 'findLocation');
  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
  }

}
