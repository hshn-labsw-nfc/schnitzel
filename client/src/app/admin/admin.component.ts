import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  authenticated: boolean;
  adminToken: string;

  constructor(private http: HttpClient) {
    this.authenticated = false;
    this.adminToken = '';
  }

  ngOnInit() {
  }


  loggedIn(token: string) {
    this.setAdminToken(token);
    this.authenticated = true;
  }

  setAdminToken(token: string): void {
    console.log('setting token:',token);
    localStorage.setItem('admintoken',token);
    this.adminToken = token;
  }

  logout(): void{
    console.log('logout');
    this.http.delete('/api/admin/session/' + this.adminToken).subscribe(
      (data) => {
        console.log('logout successfull', data);
        this.adminToken = '';
        localStorage.removeItem('admintoken');
        this.authenticated = false;
      },
      (err) => {
        console.log('logout error', err);
      }
    );
  }
}
