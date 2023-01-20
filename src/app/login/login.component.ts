import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {
    focus;
    focus1;
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
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

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        // tslint:disable-next-line: no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/timesheets-list';
    }

    ngOnDestroy() {
        // tslint:disable-next-line: prefer-const
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.spinner.show();
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.toastr.warning('Form is invalid!');
            this.spinner.hide();
        }
        else {
            this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.toastr.success('Login successful');
                    this.spinner.hide();
                },
                error => {
                    this.toastr.error(error);
                    this.spinner.hide();
                });
        }
    }
}
