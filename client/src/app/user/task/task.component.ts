import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../question';
import {Location} from '../location';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public mapOpen = false;

  @Input() question: Question;
  @Input() location: Location;

  constructor() { }

  ngOnInit() {
  }

  isUnsolvedQuiz(): boolean {
    return false;
  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
  }

}
