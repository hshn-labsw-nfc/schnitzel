import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionSingleanswer} from '../../../questionsingleanswer';
import {QuestionMultiplechoice} from '../../../questionmc';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatSnackBar} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {UserQuizHintPopupComponent} from '../quiz-hint-popup/quiz-hint-popup.component';
import {UserLocationMapPopupComponent} from '../../location/location-map-popup/location-map-popup.component';
import {SharedSimpleDialogComponent} from '../../../../shared/simple-dialog/simple-dialog.component';

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

  @Output()
  quizPointEmitter: EventEmitter<any> = new EventEmitter();



  constructor(private http: HttpClient, public snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('QuizComponent got initialized with', this.question);
  }


  imageAvailable(): boolean {
    return !isNullOrUndefined(this.question.getImage());
  }

  /**
   * opens popup dialog for the hint
   */
  toggleHint() {
    const d = this.dialog.open(UserQuizHintPopupComponent, {
      data: {
        hint: this.question.getHint()
      }
    });
  }

  /**
   * sends answer to the server and checks if its correct
   * @param {string} answer
   */
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
            if (!isNullOrUndefined(data['points'])) {
              this.quizPointEmitter.emit(data['points']);
            }
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

  /**
   * skips the current question
   */
  skipQuestion(): void {
    console.log('skipping question');
    this.http.post('/api/game/sessions/' + this.sessionID + '/riddle', {skip: 'true'}).subscribe(
      (data) => {
          this.snackBar.open('Quiz übersprungen!', null, {
            duration: 2000,
            horizontalPosition: 'center'
          });
          if (!isNullOrUndefined(data['points'])) {
            this.quizPointEmitter.emit(data['points']);
          }
          this.quizOutput.emit();
      },
      (err) => {
        console.log('skip error', err);
      }
    );
  }

  /**
   * opens popup for the map
   */
  openMap(): void {
    const d = this.dialog.open(UserLocationMapPopupComponent, {
      data: {
        location: this.location
      }
    });
  }

  /**
   * deletes the local session when the user accepts the dialog
   */
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
