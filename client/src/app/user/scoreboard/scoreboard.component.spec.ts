import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScoreboardComponent } from './scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: UserScoreboardComponent;
  let fixture: ComponentFixture<UserScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
