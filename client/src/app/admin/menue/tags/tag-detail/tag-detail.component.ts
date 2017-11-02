import {Component, Inject, OnInit} from '@angular/core';
import {AdminTag} from '../tags.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminLocation} from '../../locations/locations.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-admin-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class AdminTagDetailComponent implements OnInit {
  pageHeader: string;
  createNewEntry: boolean;
  locations: Array<AdminLocation>;

  constructor(public dialogRef: MatDialogRef<AdminTagDetailComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {}

  ngOnInit() {
    if(this.data.currentTag != null){
      console.log('tag detail initialized with location', this.data.currentTag);
      this.pageHeader = 'Vorhandenen Tag Bearbeiten';
      this.createNewEntry = false;
    } else {
      console.log('tag detail initialized without location');
      this.loadDefaults();
      this.pageHeader = 'Neuen Tag Hinzufügen';
      this.createNewEntry = true;
    }
    this.loadLocations();
  }

  loadDefaults() {
    this.data.currentTag = new AdminTag('sample alias',
      'sample location',
      'sample ID',
      'sample name');
  }

  loadLocations() {
    console.log('loading current locations from server');
    this.http.get('/api/admin/locations',{headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
      (data) => {
        this.locations = new Array<AdminLocation>()
        console.log('loaded current locations',data);
        for(let d in data){
          this.locations.push(
            new AdminLocation(data[d]['description'],
              data[d]['image'],
              data[d]['isActive'],
              data[d]['name'],
              data[d]['_id']));
        }
        console.log('initialized array',this.locations);
      },
      (err) => {
        console.log('loaded current locations error', err);
      }
    );
  }

  submit() {
    if(this.createNewEntry === false) {
      this.http.put('/api/admin/tags/' + this.data.currentTag._id, {
        alias: this.data.currentTag.alias,
        location: this.data.currentTag.location,
        tagID: this.data.currentTag.tagID,
        _id: this.data.currentTag._id
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    } else {
      this.http.post('/api/admin/tags', {
        alias: this.data.currentTag.alias,
        location: this.data.currentTag.location,
        tagID: this.data.currentTag.tagID
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    }
    console.log('saving quiz detail',this.data.currentTag);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
