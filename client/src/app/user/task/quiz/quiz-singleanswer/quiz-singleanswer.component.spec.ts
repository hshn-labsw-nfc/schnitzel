import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizSingleanswerComponent } from './quiz-singleanswer.component';

describe('QuizSingleanswerComponent', () => {
  let component: UserQuizSingleanswerComponent;
  let fixture: ComponentFixture<UserQuizSingleanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizSingleanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizSingleanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
