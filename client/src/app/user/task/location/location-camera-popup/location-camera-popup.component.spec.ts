import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationCameraPopupComponent } from './location-camera-popup.component';

describe('LocationMapCameraPopupComponent', () => {
  let component: UserLocationCameraPopupComponent;
  let fixture: ComponentFixture<UserLocationCameraPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationCameraPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationCameraPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
