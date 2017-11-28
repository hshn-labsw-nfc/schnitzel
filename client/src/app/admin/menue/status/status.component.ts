import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SharedSimpleDialogComponent} from '../../../shared/simple-dialog/simple-dialog.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-admin-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class AdminStatusComponent implements OnInit, AfterViewInit {

  @Input() adminToken: string;

  public activePlaySessions: Array<PlaySession>;
  public currentMaximized = '';

  displayedColumns = ['name', 'location', 'progress'];

  dataSource = new MatTableDataSource();


  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loadSessions();
  }

  deleteActiveSessions() {
    const d = this.dialog.open(SharedSimpleDialogComponent, {
      data: {
        title: 'ALLE SESSIONS LÖSCHEN',
        message: 'Möchtest du wirklich alle aktiven Schnitzeljagd Sessions löschen?',
        button1: 'Löschen',
        button2: 'Abbrechen'
      }
    });
    d.afterClosed().subscribe(result => {
      if (result === 'b1') {
        console.log('deleting all active sessions');
        for (let i = 0; i < this.activePlaySessions.length; i++) {
          this.deleteSession(this.activePlaySessions[i].session_id);
        }
      }
    });
  }

  detailMinimize() {
    this.currentMaximized = '';
  }

  maximize(sessionID: string) {
    this.currentMaximized = sessionID;
  }

  deleteSession(sessionID: string) {
    console.log('deleting session', sessionID);
    this.http.delete('/api/admin/playsessions/' + sessionID, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('delete session successfull', data);
        for (let index = 0; index < this.activePlaySessions.length; index++) {
          if (this.activePlaySessions[index].session_id === sessionID) {
            this.activePlaySessions.splice(index, 1);
          }
        }
        this.dataSource.data = this.activePlaySessions;
      },
      (err) => {
        console.log('delete session error', err);
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadSessions() {
    console.log('loading current play sessions');
    this.http.get('/api/admin/playsessions', {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        this.activePlaySessions = [];
        for (const d in data) {
          if (data.hasOwnProperty(d)) {
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
        }
        /**
         * add current location to the locations the user has to visit if it hasn't been found already.
         */
        for (const playSession of this.activePlaySessions){
          if(playSession.task === 'findLocation'){
            playSession.sessionLocationsToVisit.push(playSession.sessionLocation);
          }
        }
        this.dataSource.data = this.activePlaySessions;
        console.log('current play sessions', this.activePlaySessions);
      },
      (err) => {
        console.log('current play sessions error', err);
      }
    );
  }

  convertInt(s: string): number {
    return parseInt(s, 10);
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
