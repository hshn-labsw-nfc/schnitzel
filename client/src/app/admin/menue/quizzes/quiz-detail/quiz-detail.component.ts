import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminQuiz} from '../quizzes.component';
import {AdminLocation} from "../../locations/locations.component";

@Component({
  selector: 'app-admin-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class AdminQuizDetailComponent implements OnInit {
  @Input() currentQuiz: AdminQuiz;
  @Input() adminToken: string;
  @Output()
  detailOutput: EventEmitter<any> = new EventEmitter();

  pageHeader: string;
  createNewEntry: boolean;
  locations: Array<AdminLocation>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(this.currentQuiz != null){
      console.log('location detail initialized with location', this.currentQuiz);
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
    this.currentQuiz = new AdminQuiz('sample answer',
      'sample description',
      'sample hint',{
      filename: '',
      filesize: '',
      filetype: '',
      base64: ''},
      'sample name', 'sample id',null);
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
      this.http.put('/api/admin/riddles/'+ this.currentQuiz._id, {
       answer: this.currentQuiz.answer,
        description: this.currentQuiz.description,
        hint: this.currentQuiz.hint,
        image: this.currentQuiz.image,
        name: this.currentQuiz.name,
        _id: this.currentQuiz._id,
        location: this.currentQuiz.location
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    } else {
      this.http.post('/api/admin/riddles', {
        answer: this.currentQuiz.answer,
        description: this.currentQuiz.description,
        hint: this.currentQuiz.hint,
        image: this.currentQuiz.image,
        name: this.currentQuiz.name,
        location: this.currentQuiz.location
      }, {headers: new HttpHeaders().set('X-Auth-Token', this.adminToken)}).subscribe(
        (data) => {
          console.log('successfully edited quiz');
        },
        (err) => {
          console.log('error editing quiz', err);
        }
      );
    }
    console.log('saving quiz detail',this.currentQuiz);
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

    this.currentQuiz.image.filename = file.name;
    this.currentQuiz.image.filesize = file.size;
    this.currentQuiz.image.filetype = file.type;

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.currentQuiz.image.base64 = btoa(binaryString);
  }
}
