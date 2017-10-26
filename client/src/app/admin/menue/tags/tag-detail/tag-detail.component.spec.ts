import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagDetailComponent } from './tag-detail.component';

describe('TagDetailComponent', () => {
  let component: AdminTagDetailComponent;
  let fixture: ComponentFixture<AdminTagDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
