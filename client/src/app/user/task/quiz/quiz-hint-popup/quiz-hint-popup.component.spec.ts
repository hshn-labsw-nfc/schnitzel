import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizHintPopupComponent } from './quiz-hint-popup.component';

describe('QuizHintPopupComponent', () => {
  let component: UserQuizHintPopupComponent;
  let fixture: ComponentFixture<UserQuizHintPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizHintPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizHintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
