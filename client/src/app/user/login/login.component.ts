import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class UserLoginComponent implements OnInit {
  @Output()
  loginOutput: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitLogin(teamname: string) {
    console.log('clicked login button',teamname);
    if (teamname.length > 3) {
      this.http.post('/api/game/sessions', {groupName: teamname}).subscribe(
        (data) => {
          console.log('loginPost data', data);
          this.loginOutput.emit('' + data);
        },
        (err) => {
          console.log('loginPost error', err);
        }
      );
    }
  }
}
