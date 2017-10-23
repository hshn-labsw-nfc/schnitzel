import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit {

  @Output()
  loginOutput: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitLogin(name: string, password: string) {
    console.log('admin login', name, password);
    this.http.post('/api/admin/session/', {username: name, password: password}).subscribe(
      (data) => {
        console.log('loginPost data', data);
        this.loginOutput.emit(data['token']);
      },
      (err) => {
        console.log('loginPost error', err);
      }
    );
  }
}
