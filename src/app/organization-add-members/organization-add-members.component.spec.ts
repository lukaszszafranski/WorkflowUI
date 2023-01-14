import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizationAddMembersComponent } from './organization-add-members.component';

describe('OrganizationAddMembersComponent', () => {
  let component: OrganizationAddMembersComponent;
  let fixture: ComponentFixture<OrganizationAddMembersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationAddMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationAddMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
