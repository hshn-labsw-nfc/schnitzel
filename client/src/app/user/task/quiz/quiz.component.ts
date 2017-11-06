import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Question} from '../../question';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class UserQuizComponent implements OnInit, OnChanges {

  showHint: boolean;

  @Input() question: Question;
  @Input() sessionID: string;

  @Output()
  quizOutput: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.showHint = false;
  }

  ngOnInit() {
    console.log('QuizComponent got initialized with',this.question);
  }

  ngOnChanges() {

  }

  imageAvailable(): boolean {
    return !isNullOrUndefined(this.question.getImage());
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
  solveQuestion(answer: string) {
    console.log('clicked solvebutton',answer);
    if(isNullOrUndefined(answer) || answer === ''){
      this.snackBar.open('Keine Antwort eingegeben!', null, {
        duration: 2000,
        horizontalPosition: 'center'
      });
    } else {
      this.http.post('/api/game/sessions/' + this.sessionID + '/riddle', {answer: answer}).subscribe(
        (data) => {
          console.log('submit answer data', data);
          if (data['correctAnswer'] === true) {
            this.snackBar.open('Richtige Anwort!', null, {
              duration: 2000,
              horizontalPosition: 'center'
            });
            this.quizOutput.emit();
          } else {
            console.log('wrong answer');
            this.snackBar.open('Falsche Antwort', null, {
              duration: 2000,
              horizontalPosition: 'center'
            });
          }
        },
        (err) => {
          console.log('submit answer error', err);
        }
      );
    }
  }
}
