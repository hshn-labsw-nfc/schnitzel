import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../question';
import {Location} from '../location';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class UserTaskComponent implements OnInit {

  public mapOpen:boolean;

  @Input() question: Question;
  @Input() location: Location;
  @Input() sessionID: string;
  @Input() currentTask: string;

  @Output()
  taskOutput: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.mapOpen = false;
    console.log('TaskComponent got initialized with',this.question,this.location);
  }

  isUnsolvedQuiz(): boolean {
    return (this.currentTask !== 'findLocation');
  }

  toggleMap() {
    this.mapOpen = !this.mapOpen;
  }

  solvedQuiz() {
    this.taskOutput.emit();
  }

}
