import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminQuizMultipleChoice, AdminQuizSingleAnswer} from '../admin-quiz';
import {AdminLocation} from '../../locations/admin-location';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar,MatSlideToggleModule} from '@angular/material';

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {
  type: string;
  pageHeader: string;
  createNewEntry: boolean;
  locations: Array<AdminLocation>;

  constructor(public dialogRef: MatDialogRef<AdminQuizDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data.currentQuiz != null) {
      console.log('location detail initialized with location', this.data.currentQuiz);
      this.pageHeader = 'Vorhandenes Quiz Bearbeiten';
      this.createNewEntry = false;
    } else {
      console.log('location detail initialized without location');
      this.loadDefaultsSingleAnswer();
      this.pageHeader = 'Neues Quiz Hinzufügen';
      this.createNewEntry = true;
    }
    this.loadLocations();
    this.type = 'singleAnswer';
  }

  /**
   * initializes quiz with default values for adding a new singleanswer quiz.
   */
  loadDefaultsSingleAnswer() {
    this.data.currentQuiz = new AdminQuizSingleAnswer('sample answer',
      'sample description',
      'sample hint',
      'sample name', 'sample id', null,true);
  }

  /**
   * initializes quiz with default values for adding a new multiple choice quiz.
   */
  loadDefaultsMultipleChoice() {
    this.data.currentQuiz = new AdminQuizMultipleChoice(['a','b','c','d'],
      'sample description',
      'sample hint',
      'sample name', 'sample id', null,true);
  }

  /**
   * loads locations from server to populate the list of locations in the dialog to select corresponding location
   */
  loadLocations() {
    console.log('loading current locations from server');
    this.http.get('/api/admin/locations', {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
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

  /**
   * submits new / edited quiz to the server using rest api
   */
  submit() {
    if (this.createNewEntry === false) {
      this.http.put('/api/admin/riddles/' + this.data.currentQuiz._id, {
        answer: this.data.currentQuiz.answer,
        description: this.data.currentQuiz.description,
        hint: this.data.currentQuiz.hint,
        name: this.data.currentQuiz.name,
        _id: this.data.currentQuiz._id,
        location: this.data.currentQuiz.location,
        isActive: this.data.currentQuiz.isActive
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        () => {
          console.log('successfully edited quiz');
          this.snackBar.open('Erfolgreich gespeichert!', null, {
            duration: 2000,
            horizontalPosition: 'center'
          });
          this.dialogRef.close();
        },
        (err) => {
          console.log('error editing quiz', err);
          this.snackBar.open('Ein Fehler ist Aufgetreten', null, {
            duration: 2000,
            horizontalPosition: 'center'
          });
        }
      );
    } else {
      this.http.post('/api/admin/riddles', {
        answer: this.data.currentQuiz.answer,
        description: this.data.currentQuiz.description,
        hint: this.data.currentQuiz.hint,
        name: this.data.currentQuiz.name,
        location: this.data.currentQuiz.location,
        isActive: this.data.currentQuiz.isActive
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.data.adminToken)}).subscribe(
        () => {
          console.log('successfully edited quiz');
          this.snackBar.open('Erfolgreich gespeichert!', null, {
            duration: 2000,
            horizontalPosition: 'center'
          });
          this.dialogRef.close();
        },
        (err) => {
          console.log('error editing quiz', err);
          this.snackBar.open('Ein Fehler ist Aufgetreten', null, {
            duration: 2000,
            horizontalPosition: 'center'
          });
        }
      );
    }
    console.log('saving quiz detail', this.data.currentQuiz);
  }

  /**
   * closes dialog
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * parses by user selected image file
   * @param evt
   */
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    console.log('filename', file.name);
    console.log('filesize', file.size);
    console.log('filetype', file.type);

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

  changeType(mc: boolean) {
    if(!mc && this.type !== 'multipleChoice') {
      if (this.createNewEntry){
        this.loadDefaultsMultipleChoice();
      }
      this.type = 'multipleChoice';
    } else if (mc && this.type !== 'singleAnswer') {
      if (this.createNewEntry){
        this.loadDefaultsSingleAnswer();
      }
      this.type = 'singleAnswer';
    }
  }
}
