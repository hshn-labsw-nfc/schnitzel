import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class AdminLocationsComponent implements OnInit {

  public detailOpen = false;
  public detailLocation: AdminLocation;

  @Input() adminToken: string;

  constructor(private http: HttpClient) {
    this.tableHeaders.push('Aktiv?');
    this.tableHeaders.push('Raumname');
    this.tableHeaders.push('Beschreibung');
  }

  public locations = new Array<AdminLocation>();
  public tableHeaders = new Array<string>();

  ngOnInit() {
    this.loadLocationsFromServer();
    this.detailLocation = null;
    this.detailOpen = false;
  }

  loadLocationsFromServer() {
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

  addLocation() {
    console.log('add location');
    this.detailLocation = null;
    this.detailOpen = true;
  }

  editLocation(location: AdminLocation) {
    console.log('edit location',location._id);
    this.detailLocation = location;
    this.detailOpen = true;
  }

  locationDetailFromSubmitted(){
    this.detailOpen = false;
    this.detailLocation = null;
    this.loadLocationsFromServer();
  }

  deleteLocation(location: AdminLocation) {
    console.log('delete location',location._id);
    this.http.delete('/api/admin/locations/'+location._id,{headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
      (data) => {
        console.log('successfully deleted location', location._id);
        this.loadLocationsFromServer();
      },
      (err) => {
        console.log('error deleting location', err);
      }
    );
  }
}

export class AdminLocation {
  constructor(public description: string,
              public image: any,
              public isActive: boolean,
              public name: string,
              public _id: string){
  }
}
