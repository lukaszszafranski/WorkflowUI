import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../../app/models/user'
import { Timesheet } from '../models/timesheet';
import { mapMonth, mapStatus } from './timesheet-list.utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TimesheetDetails } from '../models/timesheet-details';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timesheets-list',
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.css']
})
export class TimesheetsListComponent implements OnInit {

  private userId: string;
  public timesheetList: Timesheet[] = []

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private router: Router, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.userId = (JSON.parse(localStorage.getItem("currentUser"))as unknown as User).id.toString()
    this.apiService.GetTimesheetList(this.userId).subscribe(response => {
      this.timesheetList = response
      this.spinner.hide()
    })
  }

  addTimesheet(){
    let currentDate =new Date()
    const currentMonth= currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    if(!this.timesheetList.map(sheet => sheet.month).includes(currentMonth)){
      this.apiService.CreateTimesheet({month: currentMonth, year: currentYear, timesheetStatus: 'D', userId: this.userId} as Timesheet).subscribe(
        val => {
          this.toastr.success("Timesheed added succesfully!")
          this.router.navigate([`/timesheet/${(val as Timesheet).timesheetID}`])
        }
      )
    } else if(!this.timesheetList.map(sheet => sheet.month).includes(currentMonth + 1)){
      currentDate.setMonth(currentDate.getMonth() + 1)
      this.apiService.CreateTimesheet({month: currentDate.getMonth() + 1, year: currentYear, timesheetStatus: 'D', userId: this.userId} as Timesheet).subscribe(
        val => {
          this.toastr.success("Timesheed added succesfully!")
          this.router.navigate([`/timesheet/${(val as Timesheet).timesheetID}`])
        }
      )
    } else {
      this.toastr.warning("You already have enough timesheets!")
    }
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
