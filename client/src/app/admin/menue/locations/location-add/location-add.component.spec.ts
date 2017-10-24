import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationAddComponent } from './location-add.component';

describe('LocationAddComponent', () => {
  let component: AdminLocationAddComponent;
  let fixture: ComponentFixture<AdminLocationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
