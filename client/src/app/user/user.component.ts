import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Location} from './location';
import {Question} from './question';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  gameRunning: boolean;
  sessionID: string;
  progressCount: number;
  progressDone: number;
  currentLocation: Location;
  currentQuestion: Question;
  currentTask: string;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.gameRunning = false;
    this.sessionID = '';
    this.progressDone = 0;
    this.progressCount = 1;

    if(localStorage.getItem('sessionID') !== null){
      this.sessionID = localStorage.getItem('sessionID');
      this.gameRunning = true;
    }
    if(this.gameRunning === true){
      if(this.urlContainsTag()){
        this.handleScannedTag(true);
      } else {
        this.getStateFromServer();
      }
    }
  }

  urlContainsTag():boolean {
    const url = this.router.url;
    if(url.startsWith('/tag#/')) {
      return true;
    } else {
      return false;
    }
  }

  handleScannedTag(reload: boolean) {
    let url = this.router.url;
    url = url.slice(6);
    console.log('url', url);

    this.http.post('/api/game/sessions/' + this.sessionID + '/location', {tagID: url}).subscribe(
      (data) => {
        console.log('scanned tag', data);
        if (reload === true) {
          this.getStateFromServer();
        }
      },
      (err) => {
        console.log('scanned tag error', err);
      }
    );
  }


  isGameFinished(): boolean {
    return (this.progressDone === this.progressCount);
  }

  loggedIn(id: string) {
    localStorage.setItem('sessionID',id);
    this.getStateFromServer();
    this.gameRunning = true;
  }

  getStateFromServer() {
    this.http.get('/api/game/sessions/' + this.sessionID).subscribe(
      data => {
        console.log('data from server',data);
        const dataLocation = data['location'];
        const dataQuestion = data['riddle'];
        const dataProgress = data['progress'];

        this.progressCount = dataProgress['count'];
        this.progressDone = dataProgress['done'];
        this.currentTask = data['task'];

        this.currentLocation = new Location(dataLocation['name'],0,0,0,dataLocation['image']);
        this.currentQuestion = new Question('0',dataQuestion['description'],dataQuestion['hint'],dataQuestion['image']);

        console.log('the new question/location',this.currentQuestion,this.currentLocation);
      },
      (err: HttpErrorResponse) => {
        console.log('error in State',err);
        if(err['status']=== 403){
          localStorage.clear();
          this.gameRunning = false;
        }
      }
    );
  }
}
