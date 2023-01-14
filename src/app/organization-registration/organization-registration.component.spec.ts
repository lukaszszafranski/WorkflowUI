import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizationRegistrationComponent } from './organization-registration.component';

describe('OrganizationRegistrationComponent', () => {
  let component: OrganizationRegistrationComponent;
  let fixture: ComponentFixture<OrganizationRegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
