import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ' <a routerLink="/admin"></a> <router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app';
}
