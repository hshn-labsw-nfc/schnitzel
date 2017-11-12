import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminTagDetailComponent} from './tag-detail/tag-detail.component';
import {MatDialog} from '@angular/material';
import {AdminTag} from './admin-tag';

@Component({
  selector: 'app-admin-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class AdminTagsComponent implements OnInit {
  @Input() adminToken: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.tableHeaders.push('TagID');
    this.tableHeaders.push('Alias');
    this.tableHeaders.push('Ort');
    this.tableHeaders.push('Tag Url');
  }

  public tags = new Array<AdminTag>();
  public tableHeaders = new Array<string>();

  ngOnInit() {
    this.loadTagsFromServer();
  }

  loadTagsFromServer() {
    console.log('loading current tags from server');
    this.http.get('/api/admin/tags',{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        this.tags = new Array<AdminTag>();
        console.log('loaded current tags',data);
        for(let d in data){
          this.tags.push(
            new AdminTag(data[d]['alias'],
              data[d]['location'],
              data[d]['tagID'],
              data[d]['_id']));
        }
        console.log('initialized array',this.tags);
      },
      (err) => {
        console.log('loaded current tags error', err);
      }
    );
  }
  addTag() {
    console.log('add location');
    const edit = this.dialog.open(AdminTagDetailComponent, {data: {
      currentTag: null,
      adminToken: this.adminToken
    }});
    edit.afterClosed().subscribe(result => {
      this.loadTagsFromServer();
    });
  }
  editTag(tag: AdminTag) {
    console.log('edit tag',tag._id);
    const edit = this.dialog.open(AdminTagDetailComponent, {data: {
      currentTag: tag,
      adminToken: this.adminToken
    }});
    edit.afterClosed().subscribe(result => {
      this.loadTagsFromServer();
    });
  }
  deleteTag(tag: AdminTag) {
    console.log('delete quiz',tag._id);
    this.http.delete('/api/admin/tags/'+tag._id,{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('successfully deleted Tag', tag._id);
        this.loadTagsFromServer();
      },
      (err) => {
        console.log('error deleting Tag//', err);
      }
    );
  }
}
