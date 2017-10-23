import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapComponent } from './map.component';

describe('MapComponent', () => {
  let component: UserMapComponent;
  let fixture: ComponentFixture<UserMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
