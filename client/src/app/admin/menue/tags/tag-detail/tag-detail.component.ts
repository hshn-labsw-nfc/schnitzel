import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminTag} from '../tags.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  }

  loadDefaults() {
    this.currentTag = new AdminTag('sample alias',
      'sample location',
      'sample ID',
      'sample name');
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
