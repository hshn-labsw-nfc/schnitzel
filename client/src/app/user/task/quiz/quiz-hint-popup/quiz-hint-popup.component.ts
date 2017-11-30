import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-quiz-hint-popup',
  templateUrl: './quiz-hint-popup.component.html',
  styleUrls: ['./quiz-hint-popup.component.css']
})
export class UserQuizHintPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserQuizHintPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
