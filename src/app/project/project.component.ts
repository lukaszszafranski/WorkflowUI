import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;
  columnName: string;
  taskName: string;
  taskForm: FormGroup;
  columnForm: FormGroup;
  tempColumnID: number;
  columnCounter: number;
  projectTitle: string;
  projectForm: FormGroup;
  columnNameForm: FormGroup;
  columnNameChange: string;
  taskNameForm: FormGroup;
  taskNameChange: string;

  constructor(private apiService: ApiService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getValues();
    });

    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required, Validators.maxLength(25)],
    });
    this.columnForm = this.formBuilder.group({
      columnName: ['', Validators.required, Validators.maxLength(10)],
    });

    this.projectForm = this.formBuilder.group({
      projectTitle: ['', Validators.required],
    });

    this.columnNameForm = this.formBuilder.group({
      columnNameChange: ['', Validators.required, Validators.maxLength(10)],
    });


    this.taskNameForm = this.formBuilder.group({
      taskNameChange: ['', Validators.required, Validators.maxLength(25)],
    });
  }

  getValues(){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');
    this.apiService.GetProjectByID(projectID).subscribe(
      response => {
        this.project = response;
        this.columnCounter = this.project.columns.length;
        this.projectTitle = this.project.title;
        this.spinner.hide();
      },
      error => {
        this.toastr.warning(error);
        if (error === 'Unknown Error'){
          this.router.navigate(['/404']);
          this.spinner.hide();
        }
        this.spinner.hide();
      }
    );
  }

  addColumn(){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.columnForm = this.formBuilder.group({
      columnName: [this.columnName, Validators.required],
    });

    if (this.columnForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.columnForm.controls['columnName'].value === ' ') {
      this.toastr.error('Nice try :)');
      this.spinner.hide();
    }
    else {
      this.apiService.CreateColumn(this.columnForm.value, projectID).subscribe(response => {
        this.toastr.success('Column ' + this.columnName + ' created!');
        setTimeout(this.ReloadPage, 1000);
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      });
    }
  }

  removeProject(){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.apiService.DeleteProject(projectID).subscribe(response => {
      this.router.navigate(['/projects-list']);
      this.toastr.success('Project ' + this.project.title + ' was removed!');
      this.spinner.hide();
    }, error => {
      this.toastr.warning(error);
      this.spinner.hide();
    });
  }

  updateProject(){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.projectForm = this.formBuilder.group({
      title: [this.projectTitle, Validators.required],
    });

    if (this.projectForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.projectForm.controls['title'].value === ' ') {
      this.toastr.error('Nice try :)');
      this.spinner.hide();
    }
    else {
      this.apiService.UpdateProject(projectID, this.projectForm.value).subscribe(response => {
        // tslint:disable-next-line: no-string-literal
        this.toastr.success('Your new project name: ' + this.projectForm.controls['title'].value);
        setTimeout(this.ReloadPage, 1000);
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      });
    }
  }

  ReloadPage(){
    window.location.reload();
  }

  addTask(){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.taskForm = this.formBuilder.group({
      name: [this.taskName, Validators.required],
    });

    if (this.taskForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.taskForm.controls['name'].value === ' ') {
      this.toastr.error('Nice try :)');
      this.spinner.hide();
    }
    else {
      this.apiService.CreateTask(this.taskForm.value, projectID, this.tempColumnID).subscribe(response => {
        this.toastr.success('Task ' + this.taskName + ' was created!');
        setTimeout(this.ReloadPage, 1000);
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      });
    }
  }

  passID(columnID: number){
    this.tempColumnID = columnID;
  }

  removeColumn(columnID: number) {
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.apiService.RemoveColumn(projectID, columnID).subscribe(response => {
      this.toastr.success('Column was removed');
      setTimeout(this.ReloadPage, 2000);
      this.spinner.hide();
    }, error => {
      this.toastr.warning(error);
      this.spinner.hide();
    });
  }

  updateColumn(columnID: number){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.columnNameForm = this.formBuilder.group({
      columnName: [this.columnNameChange, Validators.required],
    });

    console.log(this.columnNameForm.value);

    if (this.columnNameForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.columnNameForm.controls['columnName'].value === ' ') {
      this.toastr.error('Nice try :)');
      this.spinner.hide();
    }
    else {
      this.apiService.UpdateColumn(projectID, columnID, this.columnNameForm.value).subscribe(response => {
        // tslint:disable-next-line: no-string-literal
        this.toastr.success('Your new column name: ' + this.columnNameForm.controls['columnName'].value);
        setTimeout(this.ReloadPage, 1000);
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      });
    }
  }

  updateTask(columnID: number, taskID: number){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.taskNameForm = this.formBuilder.group({
      name: [this.taskNameChange, Validators.required],
    });

    if (this.taskNameForm.invalid) {
      this.toastr.error('Form is invalid!');
      this.spinner.hide();
    }
    else if (this.taskNameForm.controls['name'].value === ' ') {
      this.toastr.error('Nice try :)');
      this.spinner.hide();
    }
    else {
      this.apiService.UpdateTask(projectID, columnID, taskID, this.taskNameForm.value).subscribe(response => {
        // tslint:disable-next-line: no-string-literal
        this.toastr.success('New task name: ' + this.taskNameForm.controls['name'].value);
        setTimeout(this.ReloadPage, 1000);
        this.spinner.hide();
      }, error => {
        this.toastr.warning(error);
        this.spinner.hide();
      });
    }
  }

  removeTask(columnID: number, taskID: number){
    this.spinner.show();
    const projectID: number = +this.route.snapshot.paramMap.get('projectID');

    this.apiService.RemoveTask(projectID, columnID, taskID).subscribe(response => {
      this.toastr.success('Task was removed');
      setTimeout(this.ReloadPage, 1000);
      this.spinner.hide();
    }, error => {
      this.toastr.warning(error);
      this.spinner.hide();
    });
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.project.columns, event.previousIndex, event.currentIndex);
  }

  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(): any[] {
    return this.project.columns.map(x => `${x.columnID}`);
  }
}
