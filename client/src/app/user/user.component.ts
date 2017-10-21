import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  gameRunning: boolean;
  sessionID: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.gameRunning = false;
    this.sessionID = '';

    if(localStorage.getItem('sessionID') !== null){
      this.gameRunning = true;
      this.sessionID = localStorage.getItem('sessionID');
      this.getStateFromServer();
    }
  }

  isGameFinished(): boolean {
    return true;
  }

  loggedIn(id: string) {
    localStorage.setItem('sessionID',id);
    this.getStateFromServer();
    this.gameRunning = true;
  }

  getStateFromServer() {
    this.http.get('/api/game/sessions/' + this.sessionID).subscribe(
      data => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
