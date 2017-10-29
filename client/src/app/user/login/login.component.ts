import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class UserLoginComponent implements OnInit {
  @Output()
  loginOutput: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, public snackBar: MatSnackBar) { }

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
    } else {
     this.snackBar.open('Gruppenname muss aus mindestens 4 Zeichen bestehen',null, {
        duration: 2000,
        horizontalPosition: 'center'
      });
    }
  }
}
