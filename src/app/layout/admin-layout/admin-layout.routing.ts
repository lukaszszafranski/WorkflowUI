import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { OrganizationComponent } from 'src/app/organization/organization.component';
import { OrganizationRegistrationComponent } from 'src/app/organization-registration/organization-registration.component';
import { OrganizationAddMembersComponent } from 'src/app/organization-add-members/organization-add-members.component';
import { OrganizationJoinComponent } from 'src/app/organization-join/organization-join.component';
import { ProjectsListComponent } from 'src/app/projects-list/projects-list.component';
import { ChatComponent } from 'src/app/chat/chat.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { SupportComponent } from 'src/app/support/support.component';
import { ProjectComponent } from 'src/app/project/project.component';
import { TimesheetsListComponent } from 'src/app/timesheets-list/timesheets-list.component';
import { TimesheetDetailsComponent } from 'src/app/timesheet-details/timesheet-details.component';
import { AuthManagerGuard } from 'src/app/helpers/auth-menager.guard';
import { ManageTimesheetsComponent } from 'src/app/manage-timesheets/manage-timesheets.component';
import { ManageTimesheetDetailsComponent } from 'src/app/manage-timesheet-details/manage-timesheet-details.component';
import { UserDashboardComponent } from 'src/app/user-dashboard/user-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthManagerGuard] },
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'organization', component: OrganizationComponent },
    { path: 'organization-register', component: OrganizationRegistrationComponent },
    { path: 'organization-add-members', component: OrganizationAddMembersComponent },
    { path: 'organization-join', component: OrganizationJoinComponent },
    { path: 'projects-list', component: ProjectsListComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'support', component: SupportComponent },
    { path: 'project/:projectID', component: ProjectComponent },
    { path: 'timesheets-list', component: TimesheetsListComponent },
    { path: 'timesheets-review', component: ManageTimesheetsComponent, canActivate: [AuthManagerGuard] },
    { path: 'timesheet/:timesheetID', component: TimesheetDetailsComponent },
    { path: 'timesheet-review/:timesheetID', component: ManageTimesheetDetailsComponent, canActivate: [AuthManagerGuard] }
];
