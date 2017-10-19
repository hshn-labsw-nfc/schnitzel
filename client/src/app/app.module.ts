import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'admin', component: AdminComponent},
      {path: '**', component: UserComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
