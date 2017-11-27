import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionSingleanswer} from '../questionsingleanswer';
import {Location} from '../location';
import {QuestionMultiplechoice} from "../questionmc";

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class UserTaskComponent implements OnInit {

  @Input() question: any;
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

  isQuestionSingleanswer(): boolean {
    return (this.question instanceof QuestionSingleanswer);
  }

  isQuestionMultiplechoice(): boolean {
    return (this.question instanceof QuestionMultiplechoice);
  }
}
