import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenueComponent } from './menue.component';

describe('MenueComponent', () => {
  let component: AdminMenueComponent;
  let fixture: ComponentFixture<AdminMenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
