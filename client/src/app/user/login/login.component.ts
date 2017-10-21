import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  quizOutput: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submitLogin(teamname: string) {
    console.log('clicked login button',teamname);
    this.http.post('/api/game/sessions',teamname).subscribe(
      (data) => {
        console.log('loginPost data', data);
        this.quizOutput.emit('' + data);
      },
      (err) => {
        console.log('loginPost error', err);
      }
    );
  }

}
