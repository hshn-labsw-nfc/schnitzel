import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let component: AdminLocationsComponent;
  let fixture: ComponentFixture<AdminLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
