import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: AdminStatusComponent;
  let fixture: ComponentFixture<AdminStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
