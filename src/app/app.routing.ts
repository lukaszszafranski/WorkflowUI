import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationJoinComponent } from './organization-join/organization-join.component';
import { OrganizationAddMembersComponent } from './organization-add-members/organization-add-members.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'organization',
    component: OrganizationComponent
  },
  {
    path: 'organization-register',
    component: OrganizationRegistrationComponent
  },
  {
    path: 'organization-add-members',
    component: OrganizationAddMembersComponent
  },
  {
    path: 'organization-join',
    component: OrganizationJoinComponent
  },
  {
    path: 'projects-list',
    canActivate: [AuthGuard],
    component: ProjectsListComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent
  },
  {
    path: 'documentation',
    canActivate: [AuthGuard],
    component: DocumentationComponent
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    component: ContactComponent
  },
  {
    path: 'support',
    canActivate: [AuthGuard],
    component: SupportComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);

