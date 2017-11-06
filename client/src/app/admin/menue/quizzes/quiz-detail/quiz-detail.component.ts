import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminQuiz} from '../quizzes.component';
import {AdminLocation} from "../../locations/locations.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {
  pageHeader: string;
  createNewEntry: boolean;
  locations: Array<AdminLocation>;

  constructor(public dialogRef: MatDialogRef<AdminQuizDetailComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {}

  ngOnInit() {
    if(this.data.currentQuiz != null){
      console.log('location detail initialized with location', this.data.currentQuiz);
      this.pageHeader = 'Vorhandenes Quiz Bearbeiten';
      this.createNewEntry = false;
    } else {
      console.log('location detail initialized without location');
      this.loadDefaults();
      this.pageHeader = 'Neues Quiz Hinzufügen';
      this.createNewEntry = true;
    }
    this.loadLocations();
  }

  loadDefaults() {
    this.data.currentQuiz = new AdminQuiz('sample answer',
      'sample description',
      'sample hint',
      'sample name', 'sample id',null);
  }

  loadLocations() {
    console.log('loading current locations from server');
    this.http.get('/api/admin/locations',{headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
      (data) => {
        this.locations = new Array<AdminLocation>();
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
      this.http.put('/api/admin/riddles/'+ this.data.currentQuiz._id, {
       answer: this.data.currentQuiz.answer,
        description: this.data.currentQuiz.description,
        hint: this.data.currentQuiz.hint,
        name: this.data.currentQuiz.name,
        _id: this.data.currentQuiz._id,
        location: this.data.currentQuiz.location
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    } else {
      this.http.post('/api/admin/riddles', {
        answer: this.data.currentQuiz.answer,
        description: this.data.currentQuiz.description,
        hint: this.data.currentQuiz.hint,
        name: this.data.currentQuiz.name,
        location: this.data.currentQuiz.location
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    }
    console.log('saving quiz detail',this.data.currentQuiz);
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    console.log('filename',file.name);
    console.log('filesize',file.size);
    console.log('filetype',file.type);

    this.data.currentQuiz.image.filename = file.name;
    this.data.currentQuiz.image.filesize = file.size;
    this.data.currentQuiz.image.filetype = file.type;

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.data.currentQuiz.image.base64 = btoa(binaryString);
  }
}
