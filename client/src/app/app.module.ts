import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { UserFooterComponent } from './user/footer/footer.component';
import { UserProgressComponent } from './user/progress/progress.component';
import { UserLoginComponent } from './user/login/login.component';
import { UserScoreboardComponent } from './user/scoreboard/scoreboard.component';
import { UserTaskComponent } from './user/task/task.component';
import { UserMapComponent } from './user/task/map/map.component';
import { UserQuizComponent } from './user/task/quiz/quiz.component';
import { UserLocationComponent } from './user/task/location/location.component';
import { AdminLoginComponent} from './admin/login/login.component';
import { AdminMenueComponent } from './admin/menue/menue.component';
import { AdminStatusComponent } from './admin/menue/status/status.component';
import { AdminConfigurationComponent } from './admin/menue/configuration/configuration.component';
import { AdminLocationsComponent } from './admin/menue/locations/locations.component';
import { AdminQuizzesComponent } from './admin/menue/quizzes/quizzes.component';
import { AdminTagsComponent } from './admin/menue/tags/tags.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminStatusDetailComponent } from './admin/menue/status/status-detail/status-detail.component';
import { AdminLocationDetailComponent } from './admin/menue/locations/location-detail/location-detail.component';
import { AdminQuizDetailComponent } from './admin/menue/quizzes/quiz-detail/quiz-detail.component';
import { AdminTagDetailComponent } from './admin/menue/tags/tag-detail/tag-detail.component';

// Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {SharedSimpleDialogComponent} from './shared/simple-dialog/simple-dialog.component';
import {MatProgressBarModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';

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
      path: '',
      component: UserComponent
    },
    {path: '**',
      redirectTo: '/user'
    }
  ]},
  {
    path: 'tag',
    component: UserComponent
  },
  {path: '**', redirectTo: 'user'}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    UserTaskComponent,
    UserFooterComponent,
    UserProgressComponent,
    UserLoginComponent,
    UserScoreboardComponent,
    UserTaskComponent,
    UserMapComponent,
    UserQuizComponent,
    UserLocationComponent,
    AdminLoginComponent,
    AdminMenueComponent,
    AdminStatusComponent,
    AdminConfigurationComponent,
    AdminLocationsComponent,
    AdminQuizzesComponent,
    AdminTagsComponent,
    AdminStatusDetailComponent,
    AdminLocationDetailComponent,
    AdminQuizDetailComponent,
    AdminTagDetailComponent,
    SharedSimpleDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  entryComponents: [
    SharedSimpleDialogComponent,
    AdminLocationDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
