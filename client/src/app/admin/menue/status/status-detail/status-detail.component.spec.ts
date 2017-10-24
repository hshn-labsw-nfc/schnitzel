import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusDetailComponent } from './status-detail.component';

describe('StatusDetailComponent', () => {
  let component: AdminStatusDetailComponent;
  let fixture: ComponentFixture<AdminStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
