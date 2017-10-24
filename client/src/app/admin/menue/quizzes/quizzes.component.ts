import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-admin-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class AdminQuizzesComponent implements OnInit {

  @Input() adminToken: string;

  constructor(private http: HttpClient) {
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
              data[d]['_id']));
        }
        console.log('initialized array',this.quizzes);
      },
      (err) => {
        console.log('loaded current quizzes error', err);
      }
    );
  }
  addQuiz() {

  }
  editQuiz(id: string) {

  }
  deleteQuiz(id: string) {
    console.log('delete quiz',id);
    this.http.delete('/api/admin/riddles/'+id,{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('successfully deleted quiz', id);
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
              public _id: string) {
  }
}
