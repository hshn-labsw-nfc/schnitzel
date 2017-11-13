import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {AdminQuiz} from './admin-quiz';
import {AdminQuizDetailComponent} from './quiz-detail/quiz-detail.component';

@Component({
  selector: 'app-admin-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class AdminQuizzesComponent implements OnInit {
  @Input() adminToken: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.tableHeaders = [];
    this.tableHeaders.push('Aktiv?');
    this.tableHeaders.push('Rätselname');
    this.tableHeaders.push('Beschreibung');
    this.tableHeaders.push('ID');
  }

  public quizzes: Array<AdminQuiz>;
  public tableHeaders: Array<string>;

  ngOnInit() {
    this.loadQuizzesFromServer();
  }

  loadQuizzesFromServer() {
    console.log('loading current quizzes from server');
    this.http.get('/api/admin/riddles', {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        this.quizzes = [];
        console.log('loaded current quizzes', data);
        for (const d in data) {
          if (data.hasOwnProperty(d)) {
            this.quizzes.push(
              new AdminQuiz(data[d]['answer'],
                data[d]['description'],
                data[d]['hint'],
                data[d]['name'],
                data[d]['_id'],
                data[d]['location'],false));
          }
        }
        console.log('initialized array', this.quizzes);
      },
      (err) => {
        console.log('loaded current quizzes error', err);
      }
    );
  }

  addQuiz() {
    console.log('add quiz');
    const edit = this.dialog.open(AdminQuizDetailComponent, {
      data: {
        currentQuiz: null,
        adminToken: this.adminToken
      }
    });
    edit.afterClosed().subscribe(() => {
      this.loadQuizzesFromServer();
    });
  }

  editQuiz(quiz: AdminQuiz) {
    console.log('edit quiz', quiz._id);
    const edit = this.dialog.open(AdminQuizDetailComponent, {
      data: {
        currentQuiz: quiz,
        adminToken: this.adminToken
      }
    });
    edit.afterClosed().subscribe(() => {
      this.loadQuizzesFromServer();
    });
  }

  deleteQuiz(quiz: AdminQuiz) {
    console.log('delete quiz', quiz._id);
    this.http.delete('/api/admin/riddles/' + quiz._id, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      () => {
        console.log('successfully deleted quiz', quiz._id);
        this.loadQuizzesFromServer();
      },
      (err) => {
        console.log('error deleting quiz', err);
      }
    );
  }
}
