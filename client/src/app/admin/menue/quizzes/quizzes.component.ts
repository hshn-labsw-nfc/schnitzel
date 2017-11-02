import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {AdminQuizDetailComponent} from './quiz-detail/quiz-detail.component';

@Component({
  selector: 'app-admin-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class AdminQuizzesComponent implements OnInit {
  @Input() adminToken: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.tableHeaders.push('Rätselname');
    this.tableHeaders.push('Beschreibung');
    this.tableHeaders.push('ID');
  }

  public quizzes = new Array<AdminQuiz>();
  public tableHeaders = new Array<string>();

  ngOnInit() {
    this.loadQuizzesFromServer();
  }

  loadQuizzesFromServer() {
    console.log('loading current quizzes from server');
    this.http.get('/api/admin/riddles',{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        this.quizzes = new Array<AdminQuiz>()
        console.log('loaded current quizzes',data);
        for(let d in data){
           this.quizzes.push(
            new AdminQuiz(data[d]['answer'],
              data[d]['description'],
              data[d]['hint'],
              data[d]['image'],
              data[d]['name'],
              data[d]['_id'],
              data[d]['location']));
        }
        console.log('initialized array',this.quizzes);
      },
      (err) => {
        console.log('loaded current quizzes error', err);
      }
    );
  }
  addQuiz() {
    console.log('add quiz');
    const edit = this.dialog.open(AdminQuizDetailComponent, {data: {
      currentQuiz: null,
      adminToken: this.adminToken
    }});
    edit.afterClosed().subscribe(result => {
      this.loadQuizzesFromServer();
    });
  }
  editQuiz(quiz: AdminQuiz) {
    console.log('edit quiz',quiz._id);
    const edit = this.dialog.open(AdminQuizDetailComponent, {data: {
      currentQuiz: quiz,
      adminToken: this.adminToken
    }});
    edit.afterClosed().subscribe(result => {
      this.loadQuizzesFromServer();
    });
  }

  deleteQuiz(quiz: AdminQuiz) {
    console.log('delete quiz',quiz._id);
    this.http.delete('/api/admin/riddles/'+quiz._id,{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('successfully deleted quiz', quiz._id);
        this.loadQuizzesFromServer();
      },
      (err) => {
        console.log('error deleting quiz', err);
      }
    );
  }
}

export class AdminQuiz {
  constructor(public answer: string,
              public description: string,
              public hint: string,
              public image: any,
              public name: string,
              public _id: string,
              public location: string) {
  }
}
