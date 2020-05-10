import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAddMembersComponent } from './organization-add-members.component';

describe('OrganizationAddMembersComponent', () => {
  let component: OrganizationAddMembersComponent;
  let fixture: ComponentFixture<OrganizationAddMembersComponent>;

  beforeEach(async(() => {
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
