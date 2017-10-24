import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-admin-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class AdminStatusComponent implements OnInit {

  @Input() adminToken: string;

  public activePlaySessions = new Array<PlaySession>();
  public currentMaximized = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadSessions();
  }

  deleteActiveSessions(){
    for(let i = 0; i< this.activePlaySessions.length; i++){
      this.deleteSession(this.activePlaySessions[i].session_id);
    }
  }

  detailMinimize() {
    this.currentMaximized = '';
  }

  maximize(sessionID: string){
    this.currentMaximized = sessionID;
  }

  deleteSession(sessionID: string){
    console.log('deleting session', sessionID);
    this.http.delete('/api/admin/playsessions/' + sessionID,{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('delete session successfull', data);
        for(let index = 0; index < this.activePlaySessions.length; index ++){
          if(this.activePlaySessions[index].session_id === sessionID){
            this.activePlaySessions.splice(index, 1);
          }
        }
      },
      (err) => {
        console.log('delete session error', err);
      }
    );
  }

  loadSessions() {
    console.log('loading current play sessions');
    this.http.get('/api/admin/playsessions',{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        for(let d in data){
          this.activePlaySessions = new Array<PlaySession>();
          this.activePlaySessions.push(
            new PlaySession(data[d]['groupName'],
              data[d]['lastUpdated'],
              data[d]['location'],
              data[d]['locationCount'],
              data[d]['locationsToVisit'],
              data[d]['riddle'],
              data[d]['task'],
              data[d]['usedRiddles'],
              data[d]['_id']));
        }
        console.log('current play sessions', this.activePlaySessions);
      },
      (err) => {
        console.log('current play sessions error', err);
      }
    );
  }
}

export class PlaySession {
  constructor(public sessionGroupName: string,
              public sessionlastUpdated: string,
              public sessionLocation: string,
              public sessionLocationCount: string,
              public sessionLocationsToVisit: Array<string>,
              public sessionRiddle: string, public task: string,
              public sessionUsedRiddles: Array<string>,
              public session_id: string) {

  }
}
