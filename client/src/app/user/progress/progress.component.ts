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
  @Input() startDate: Date;
  @Input() endDate: Date;

  parsedTime: string;

  constructor() {
  }

  ngOnInit() {
    /**
     * when the enddate is null the session is still running, so the timer has to increase every second.
     */
    if(this.endDate === null) {
      IntervalObservable.create(1000).subscribe(n => this.parsedTime = this.parseTime());
    }
  }

  /**
   * parses the start/end timestamp to a time Interval.
   * Hours, Minutes and Seconds are splitted by a :
   * @returns {string}
   */
  parseTime(): string{

    let currentTime: Date;

    if(this.endDate !== null) {
      currentTime = new Date(this.endDate.getTime() - this.startDate.getTime());
    } else {
      currentTime = new Date((new Date().getTime() - this.startDate.getTime()));
    }
    currentTime = new Date(currentTime.getTime() + (currentTime.getTimezoneOffset() * 60 * 1000));

    let time = '';

    if (currentTime.getHours() < 10){
      time += '0';
      time += currentTime.getHours();
    } else {
      time += currentTime.getHours();
    }

    time += ':';

    if (currentTime.getMinutes() < 10){
      time += '0';
      time += currentTime.getMinutes();
    } else {
      time += currentTime.getMinutes();
    }

    time += ':';

    if (currentTime.getSeconds() < 10){
      time += '0';
      time += currentTime.getSeconds();
    } else {
      time += currentTime.getSeconds();
    }

    return time;
  }
}
