import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: UserQuizComponent;
  let fixture: ComponentFixture<UserQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
