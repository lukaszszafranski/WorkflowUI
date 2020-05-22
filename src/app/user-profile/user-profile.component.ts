import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  firstName: string;
  lastName: string;
  username: string;
  updateForm: FormGroup;

  passwordValue: string;


  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.firstName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    this.lastName = JSON.parse(localStorage.getItem('currentUser')).lastName;
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;

    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  updateUser() {
    this.spinner.show();

    this.updateForm = this.formBuilder.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      username: [this.username, Validators.required],
      password: [this.passwordValue, Validators.required, Validators.minLength(6)]
    });

    if (this.updateForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.updateForm.controls['username'].value === ' '){
      this.toastr.error('Nice try ;)');
      this.spinner.hide();
    }
    else {
      this.userService.put(this.id, this.updateForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.toastr.success('Update successful');
                  this.spinner.hide();
                },
                error => {
                  this.toastr.warning('Update error');
                  this.spinner.hide();
                });
    }
  }
}
