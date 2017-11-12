import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminLocationDetailComponent} from './location-detail/location-detail.component';
import {MatDialog} from '@angular/material';
import {AdminLocation} from './admin-location';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class AdminLocationsComponent implements OnInit {

  @Input() adminToken: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.tableHeaders = [];
    this.tableHeaders.push('Aktiv?');
    this.tableHeaders.push('Raumname');
    this.tableHeaders.push('Beschreibung');
  }

  public locations : Array<AdminLocation>;
  public tableHeaders : Array<string>;

  ngOnInit() {
    this.loadLocationsFromServer();
  }

  loadLocationsFromServer() {
    console.log('loading current locations from server');
    this.http.get('/api/admin/locations', {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        this.locations = [];
        console.log('loaded current locations', data);
        for (const d in data) {
          if (data.hasOwnProperty(d)) {
            this.locations.push(
              new AdminLocation(data[d]['description'],
                data[d]['image'],
                data[d]['isActive'],
                data[d]['name'],
                data[d]['_id']));
          }
        }
        console.log('initialized array', this.locations);
      },
      (err) => {
        console.log('loaded current locations error', err);
      }
    );
  }

  addLocation() {
    console.log('add location');
    const edit = this.dialog.open(AdminLocationDetailComponent, {
      data: {
        currentLocation: null,
        adminToken: this.adminToken
      }
    });
    edit.afterClosed().subscribe(() => {
      this.loadLocationsFromServer();
    });
  }

  editLocation(location: AdminLocation) {
    console.log('edit location', location._id);
    const edit = this.dialog.open(AdminLocationDetailComponent, {
      data: {
        currentLocation: location,
        adminToken: this.adminToken
      }
    });
    edit.afterClosed().subscribe(() => {
      this.loadLocationsFromServer();
    });
  }

  deleteLocation(location: AdminLocation) {
    console.log('delete location', location._id);
    this.http.delete('/api/admin/locations/' + location._id, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      () => {
        console.log('successfully deleted location', location._id);
        this.loadLocationsFromServer();
      },
      (err) => {
        console.log('error deleting location', err);
      }
    );
  }
}
