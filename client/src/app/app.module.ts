import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './user/footer/footer.component';
import { ProgressComponent } from './user/progress/progress.component';
import { LoginComponent } from './user/login/login.component';
import { ScoreboardComponent } from './user/scoreboard/scoreboard.component';
import { TaskComponent } from './user/task/task.component';
import { MapComponent } from './user/task/map/map.component';
import { QuizComponent } from './user/task/quiz/quiz.component';
import { LocationComponent } from './user/task/location/location.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent,
    children: [
        {
          path: 'listriddles',
          component: AdminComponent
        },
        {
          path: 'addriddle',
          component: AdminComponent
        },
        {
          path: 'edittiddle:id',
          component: AdminComponent
        },
        {
          path: 'listlocations',
          component: AdminComponent
        },
        {
          path: 'addlocation',
          component: AdminComponent
        },
        {
          path: 'editlocation:id',
          component: AdminComponent
        },
        {
          path: 'listtags',
          component: AdminComponent
        },
        {
          path: 'addtag',
          component: AdminComponent
        },
        {
          path: 'edittag:id',
          component: AdminComponent
        },
        {
          path: 'login',
          component: AdminComponent
        },
        {
          path: 'liststatuss',
          component: AdminComponent
        },
        {
          path: '**',
          redirectTo: '/admin/login'
        }
      ]
  },
  {path: 'user', component: UserComponent, children: [
    {
      path: ':tagID',
      component: UserComponent
    },
    {
      path: '',
      component: UserComponent
    },
    {
      path: '**',
      redirectTo: '/user'
    }
  ]},
  {path: '**', redirectTo: 'user'}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    TaskComponent,
    FooterComponent,
    ProgressComponent,
    LoginComponent,
    ScoreboardComponent,
    TaskComponent,
    MapComponent,
    QuizComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
