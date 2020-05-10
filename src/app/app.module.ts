import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IconsModule } from './icons/icons.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { OrganizationRegistrationComponent } from './organization-registration/organization-registration.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationJoinComponent } from './organization-join/organization-join.component';
import { OrganizationAddMembersComponent } from './organization-add-members/organization-add-members.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ChatComponent } from './chat/chat.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProjectComponent,
    SearchComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    OrganizationRegistrationComponent,
    OrganizationComponent,
    OrganizationJoinComponent,
    OrganizationAddMembersComponent,
    UserProfileComponent,
    ProjectsListComponent,
    ChatComponent,
    DocumentationComponent,
    ContactComponent,
    SupportComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgbModule,
    ToastrModule,
    NgxSpinnerModule,
    IconsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
