import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizMultiplechoiceComponent } from './quiz-multiplechoice.component';

describe('QuizMultiplechoiceComponent', () => {
  let component: UserQuizMultiplechoiceComponent;
  let fixture: ComponentFixture<UserQuizMultiplechoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizMultiplechoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizMultiplechoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
