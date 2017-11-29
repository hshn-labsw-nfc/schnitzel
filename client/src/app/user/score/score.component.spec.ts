import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: UserScoreComponent;
  let fixture: ComponentFixture<UserScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
