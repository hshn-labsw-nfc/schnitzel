import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../question';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() question: Question;

  constructor() { }

  ngOnInit() {
  }

}
