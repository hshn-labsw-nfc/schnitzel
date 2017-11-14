import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../question';
import {Location} from '../location';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class UserTaskComponent implements OnInit {

  @Input() question: Question;
  @Input() location: Location;
  @Input() sessionID: string;
  @Input() currentTask: string;

  @Output()
  taskOutput: EventEmitter<any> = new EventEmitter();

  @Output()
  taskLogout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('TaskComponent got initialized with',this.question,this.location);
  }

  isUnsolvedQuiz(): boolean {
    return (this.currentTask !== 'findLocation');
  }

  solvedQuiz() {
    this.taskOutput.emit();
  }

  loggedOut(): void {
    this.taskLogout.emit();
  }

}
