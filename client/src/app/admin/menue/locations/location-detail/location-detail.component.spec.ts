import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationDetailComponent } from './location-detail.component';

describe('LocationDetailComponent', () => {
  let component: AdminLocationDetailComponent;
  let fixture: ComponentFixture<AdminLocationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
