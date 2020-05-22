import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../models/Project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  constructor(private apiService: ApiService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

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
  }

}
