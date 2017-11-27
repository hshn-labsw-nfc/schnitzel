import {Component, Input, OnInit} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-user-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class UserProgressComponent implements OnInit {

  @Input() progressCount: number;
  @Input() progressDone: number;
  @Input() currentTime: Date;

  constructor() {
  }

  ngOnInit() {
    IntervalObservable.create(1000).subscribe(n => this.incrementTimer());
  }

  incrementTimer(): void {
    console.log('it works',this.currentTime);
    this.currentTime.setTime(this.currentTime.getTime() + 1000);
  }

  parseTime(): string{
    let time = '';

    if (this.currentTime.getHours() < 10){
      time += '0';
      time += this.currentTime.getHours();
    } else {
      time += this.currentTime.getHours();
    }

    time += ':';

    if (this.currentTime.getMinutes() < 10){
      time += '0';
      time += this.currentTime.getMinutes();
    } else {
      time += this.currentTime.getMinutes();
    }

    time += ':';

    if (this.currentTime.getSeconds() < 10){
      time += '0';
      time += this.currentTime.getSeconds();
    } else {
      time += this.currentTime.getSeconds();
    }

    console.log('TIMETEST',this.currentTime.getMinutes(),this.currentTime.getSeconds());

    return time;
  }
}
