import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminTag} from '../tags.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminLocation} from '../../locations/locations.component';

@Component({
  selector: 'app-admin-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class AdminTagDetailComponent implements OnInit {
  @Input() currentTag: AdminTag;
  @Input() adminToken: string;
  @Output()
  detailOutput: EventEmitter<any> = new EventEmitter();

  pageHeader: string;
  createNewEntry: boolean;
  locations: Array<AdminLocation>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(this.currentTag != null){
      console.log('tag detail initialized with location', this.currentTag);
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
    this.currentTag = new AdminTag('sample alias',
      'sample location',
      'sample ID',
      'sample name');
  }

  loadLocations() {
    console.log('loading current locations from server');
    this.http.get('/api/admin/locations',{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
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
      this.http.put('/api/admin/tags/' + this.currentTag._id, {
        alias: this.currentTag.alias,
        location: this.currentTag.location,
        tagID: this.currentTag.tagID,
        _id: this.currentTag._id
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    } else {
      this.http.post('/api/admin/tags', {
        alias: this.currentTag.alias,
        location: this.currentTag.location,
        tagID: this.currentTag.tagID
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    }
    console.log('saving quiz detail',this.currentTag);
    this.detailOutput.emit();
  }

  cancel() {
    this.detailOutput.emit();
  }
}
