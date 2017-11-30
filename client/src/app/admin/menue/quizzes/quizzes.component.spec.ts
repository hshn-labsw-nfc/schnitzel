import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizzesComponent } from './quizzes.component';

describe('QuizzesComponent', () => {
  let component: AdminQuizzesComponent;
  let fixture: ComponentFixture<AdminQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
