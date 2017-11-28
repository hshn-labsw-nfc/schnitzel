import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminLocationDetailComponent} from './location-detail/location-detail.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdminLocation} from './admin-location';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class AdminLocationsComponent implements OnInit, AfterViewInit {

  @Input() adminToken: string;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    //this.tableHeaders = [];
    //this.tableHeaders.push('Aktiv?');
    //this.tableHeaders.push('Raumname');
    //this.tableHeaders.push('Beschreibung');
  }

  public locations : Array<AdminLocation>;

  displayedColumns = ['isActive','name', 'description', 'edit'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadLocationsFromServer();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.dataSource.data = this.locations;
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
