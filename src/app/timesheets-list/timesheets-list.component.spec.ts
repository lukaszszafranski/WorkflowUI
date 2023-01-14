import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimesheetsListComponent } from './timesheets-list.component';

describe('TimesheetsListComponent', () => {
  let component: TimesheetsListComponent;
  let fixture: ComponentFixture<TimesheetsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
