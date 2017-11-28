import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionSingleanswer} from "../../../questionsingleanswer";
import {QuestionMultiplechoice} from "../../../questionmc";
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from "util";
import {UserQuizHintPopupComponent} from "../quiz-hint-popup/quiz-hint-popup.component";
import {UserLocationMapPopupComponent} from "../../location/location-map-popup/location-map-popup.component";
import {SharedSimpleDialogComponent} from "../../../../shared/simple-dialog/simple-dialog.component";

@Component({
  selector: 'app-user-quiz-multiplechoice',
  templateUrl: './quiz-multiplechoice.component.html',
  styleUrls: ['./quiz-multiplechoice.component.css']
})
export class UserQuizMultiplechoiceComponent implements OnInit {
  @Input() question: QuestionMultiplechoice;
  @Input() sessionID: string;
  @Input() location: Location;


  @Output()
  quizOutput: EventEmitter<any> = new EventEmitter();

  @Output()
  quizLogout: EventEmitter<any> = new EventEmitter();



  constructor(private http: HttpClient, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('QuizComponent got initialized with', this.question);
  }


  imageAvailable(): boolean {
    return !isNullOrUndefined(this.question.getImage());
  }

  toggleHint() {
    const d = this.dialog.open(UserQuizHintPopupComponent, {
      data: {
        hint: this.question.getHint()
      }
    });
  }

  solveQuestion(answer: string) {
    console.log('clicked solvebutton', answer);
    if (isNullOrUndefined(answer) || answer === '') {
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

  openMap(): void {
    const d = this.dialog.open(UserLocationMapPopupComponent, {
      data: {
        location: this.location
      }
    });
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
        this.quizLogout.emit();
      }
    });
  }
}
