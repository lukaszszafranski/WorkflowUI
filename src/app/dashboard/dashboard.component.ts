import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { Project } from '../models/Project';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ManagerTable } from '../models/manager-table';
import { mapStatus } from '../timesheets-list/timesheet-list.utils';
import { ChartData } from '../models/chart-data';


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
  gridApi: GridApi;
  chartData: ChartData[];
  
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'User';
  showYAxisLabel = true;
  yAxisLabel = 'Registered hours';

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private apiService: ApiService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getManagerChartData().subscribe(data => {
      this.chartData = data;
      this.spinner.hide();
    })
  }

  public columnDefs: ColDef[] = [
    { field: 'userId' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'role' },
    { field: 'timesheetID' },
    { field: 'month' },
    { field: 'year' },
    { field: 'createdOn' },
    { field: 'timesheetStatus' },
  ];
  
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };

  public rowData!: ManagerTable[];

  onGridReady(params: GridReadyEvent<ManagerTable>) {
    this.gridApi = params.api;
    this.apiService.getManagerTable().subscribe((data) => {
      data.map(x => x.timesheetStatus = mapStatus(x.timesheetStatus));
      //data.map(x => Number(x.userId)).sort();
      this.gridApi.setRowData(data);
    })
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }

  mapStatus(status: string): string {
    return mapStatus(status);
  }

  onSelect(event) {
    console.log(event);
  }
}