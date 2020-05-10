import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationJoinComponent } from './organization-join.component';

describe('OrganizationJoinComponent', () => {
  let component: OrganizationJoinComponent;
  let fixture: ComponentFixture<OrganizationJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
