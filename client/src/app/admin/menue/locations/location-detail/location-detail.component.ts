import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminLocation} from '../locations.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-admin-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class AdminLocationDetailComponent implements OnInit {
  @Input() currentLocation: AdminLocation;
  @Input() adminToken: string;
  @Output()
  detailOutput: EventEmitter<any> = new EventEmitter();

  pageHeader: string;
  createNewEntry: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(this.currentLocation != null){
      console.log('location detail initialized with location');
      this.pageHeader = 'Vorhandenen Ort Bearbeiten';
      this.createNewEntry = false;
    } else {
      console.log('location detail initialized without location');
      this.loadDefaults();
      this.pageHeader = 'Neuen Ort Hinzufügen';
      this.createNewEntry = true;
    }
  }

  loadDefaults() {
    this.currentLocation = new AdminLocation('sample description', {
      filename: '',
      filesize: '',
      filetype: '',
      base64: ''}, true, 'sample name', '12345');
  }

  submit() {
    if(this.createNewEntry === false) {
      this.http.put('/api/admin/locations/' + this.currentLocation._id, {
        description: this.currentLocation.description,
        image: this.currentLocation.image,
        isActive: this.currentLocation.isActive,
        name: this.currentLocation.name,
        _id: this.currentLocation._id,
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited location');
        },
        (err) => {
          console.log('error editing location', err);
        }
      );
    } else {
      this.http.post('/api/admin/locations', {
        description: this.currentLocation.description,
        image: this.currentLocation.image,
        isActive: this.currentLocation.isActive,
        name: this.currentLocation.name
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited location');
        },
        (err) => {
          console.log('error editing location', err);
        }
      );
    }
    console.log('saving location detail',this.currentLocation);
    this.detailOutput.emit();
  }
  cancel() {
    this.detailOutput.emit();
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    console.log('filename',file.name);
    console.log('filesize',file.size);
    console.log('filetype',file.type);

    this.currentLocation.image.filename = file.name;
    this.currentLocation.image.filesize = file.size;
    this.currentLocation.image.filetype = file.type;

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.currentLocation.image.base64 = btoa(binaryString);
  }


}
