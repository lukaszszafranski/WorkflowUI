import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit, OnDestroy {
    focus;
    focus1;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
        // tslint:disable-next-line: prefer-const
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        // tslint:disable-next-line: prefer-const
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.spinner.show();
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.toastr.warning('Form is invalid!');
            this.spinner.hide();
        }
        else {
            this.loading = true;
            this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.spinner.hide();
                    this.toastr.success('Registration successful');
                    this.router.navigate(['/login']);
                },
                error => {
                    this.toastr.error(error);
                    this.spinner.hide();
                });
        }
    }
}
