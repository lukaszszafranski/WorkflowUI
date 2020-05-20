import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrganizationRegistrationComponent } from '../../organization-registration/organization-registration.component';
import { OrganizationComponent } from '../../organization/organization.component';
import { OrganizationJoinComponent } from '../../organization-join/organization-join.component';
import { OrganizationAddMembersComponent } from '../../organization-add-members/organization-add-members.component';
import { ProjectsListComponent } from '../../projects-list/projects-list.component';
import { ChatComponent } from '../../chat/chat.component';
import { ContactComponent } from '../../contact/contact.component';
import { SupportComponent } from '../../support/support.component';
import { ProjectComponent } from '../../project/project.component';
import { IconsModule } from 'src/app/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    OrganizationComponent,
    OrganizationAddMembersComponent,
    OrganizationJoinComponent,
    OrganizationRegistrationComponent,
    ProjectComponent,
    ProjectsListComponent,
    ChatComponent,
    ContactComponent,
    SupportComponent,
  ]
})

export class AdminLayoutModule {}
