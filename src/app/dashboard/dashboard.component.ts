import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { Project } from '../models/Project';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  projectForm: FormGroup;
  title: string;
  defaultProject: Project;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private apiService: ApiService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  createProject() {
    this.spinner.show();

    this.projectForm = this.formBuilder.group({
      title: [this.title, Validators.required],
    });

    console.log(this.projectForm.value);

    if (this.projectForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else {
      this.apiService.CreateProject(this.projectForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.toastr.success('You created ' + this.title + ' Project!');
                  this.spinner.hide();
                  redirect();
                },
                error => {
                  this.toastr.warning(error);
                  this.spinner.hide();
                });
    }
  }

  redirect(){
    this.router.navigate(['/projects-list']);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
}

