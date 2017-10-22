import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() progressCount: number;
  @Input() progressDone: number;

  constructor() { }

  ngOnInit() {
  }

}
