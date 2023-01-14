import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimesheetDetailsComponent } from './timesheet-details.component';

describe('TimesheetDetailsComponent', () => {
  let component: TimesheetDetailsComponent;
  let fixture: ComponentFixture<TimesheetDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
