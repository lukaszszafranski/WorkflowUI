import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../models/Project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  currentUser: User;
  projectForm: FormGroup;
  title: string;
  defaultProject: Project;

  constructor(private apiService: ApiService, private toastr: ToastrService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  projectsArray: Project[] = [];


  ngOnInit(): void {
    this.spinner.show();
    this.apiService.GetAllProjects().subscribe(
      response => {
        this.projectsArray = response;
        this.toastr.success('Enjoy!');
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      }
    );

    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  createProject() {
    this.spinner.show();

    this.projectForm = this.formBuilder.group({
      title: [this.title, Validators.required],
    });

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
                  let closeButton = document.getElementById('closeButton');
                  closeButton.click();
                  this.ngOnInit()
                },
                error => {
                  this.toastr.warning(error);
                  this.spinner.hide();
                });
    }
  }

}
