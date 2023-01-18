import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../services/api.service';
import { User } from '../../app/models/user'
import { Timesheet } from '../models/timesheet';
import { mapMonth, mapStatus } from './timesheet-list.utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TimesheetDetails } from '../models/timesheet-details';

@Component({
  selector: 'app-timesheets-list',
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.css']
})
export class TimesheetsListComponent implements OnInit {

  private userId: string;
  public timesheetList: Timesheet[] = []

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {
    this.userId = (JSON.parse(localStorage.getItem("currentUser"))as unknown as User).id.toString()
    this.apiService.GetTimesheetList(this.userId).subscribe(response => {
      this.timesheetList = response;
    })
  
  }

  addTimesheet(){
    this.apiService.CreateTimesheet({month: 9, year: 2025, timesheetStatus: 'D', userId: this.userId} as Timesheet).subscribe(
      val => {
        this.router.navigate([`/timesheet/${(val as Timesheet).timesheetID}`])
      }
    )
  }

  mapMonth(month: number): string {
    return mapMonth(month);
  }

  mapStatus(status: string): string {
    return mapStatus(status);
  }

  mapTotalHours(details: TimesheetDetails[]): number{
    let hoursReporterd = 0;
    details.forEach(
      detail => {
        hoursReporterd += detail.registeredHours;
      }
    )
    return hoursReporterd;
  }

}
