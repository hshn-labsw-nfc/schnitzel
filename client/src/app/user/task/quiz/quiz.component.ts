import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../question';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  showHint: boolean;

  @Input() question: Question;
  @Input() sessionID: string;

  constructor(private http: HttpClient) {
    this.showHint = false;
  }

  ngOnInit() {
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
  solveQuestion(answer: string) {
    console.log('clicked solvebutton',answer);
    // this.http.post('/api/game/sessions/'+this.sessionID+'/riddle',answer).subscribe(
    //  (data) => {
    //    console.log('solveQuestion data', data);
    //  },
    //  (err) => {
    //    console.log('solveQuestion error', err);
    //  }
    // );
    this.http.post('/api/game/sessions/'+this.sessionID+'/riddle',answer).subscribe(
      (data) =>{
        console.log('submit answer data', data);
        console.log('submit answer body data', data['body']);
      },
      (err) => {
        console.log('submit answer error',err);
      }
    );

  }
}
