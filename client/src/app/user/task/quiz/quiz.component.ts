import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Question} from '../../question';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) {
    this.showHint = false;
  }

  ngOnInit() {
    console.log('QuizComponent got initialized with',this.question);
  }

  ngOnChanges() {

  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
  solveQuestion(answer: string) {
    console.log('clicked solvebutton',answer);
    this.http.post('/api/game/sessions/'+this.sessionID+'/riddle',{answer: answer}).subscribe(
      (data) =>{
        console.log('submit answer data', data);
        if(data['correctAnswer']===true){
          this.quizOutput.emit();
        } else {
          console.log('wrong answer');
        }
      },
      (err) => {
        console.log('submit answer error',err);
      }
    );

  }
}
