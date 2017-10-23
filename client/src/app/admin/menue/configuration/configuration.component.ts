import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class AdminConfigurationComponent implements OnInit {

  error: string;
  currentWinText: string;

  constructor(private http: HttpClient) {
    this.error = '';
    this.currentWinText = '123';
  }

  ngOnInit() {
  }

  changeEndText(text: string) {
    console.log('changeEndText', text);
  }

  changeUserName(name: string) {
    console.log('changeUserName', name);
  }

  changePassword(oldpassword: string, newpassword: string, newpassword2: string) {
    console.log('changePassword', oldpassword);
    if(newpassword === newpassword2) {

    } else {
      this.error = 'Passwörter stimmen nicht überein';
    }
  }
}
