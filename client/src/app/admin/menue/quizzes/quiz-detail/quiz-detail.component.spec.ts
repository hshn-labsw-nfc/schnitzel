import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizDetailComponent } from './quiz-detail.component';

describe('QuizDetailComponentComponent', () => {
  let component: AdminQuizDetailComponent;
  let fixture: ComponentFixture<AdminQuizDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
