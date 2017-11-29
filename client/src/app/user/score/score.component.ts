import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class UserScoreComponent implements OnInit {

  @Input() points: number;

  constructor() { }

  ngOnInit() {
    this.points = 0;
  }

  increasePoints(amount: number): void{
    this.points += amount;
    console.log('Points got increased by',amount);
  }
}
