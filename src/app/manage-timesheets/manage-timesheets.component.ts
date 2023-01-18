import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Timesheet } from '../models/timesheet';
import { TimesheetDetails } from '../models/timesheet-details';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { mapMonth, mapStatus } from '../timesheets-list/timesheet-list.utils';

@Component({
  selector: 'app-manage-timesheets',
  templateUrl: './manage-timesheets.component.html',
  styleUrls: ['./manage-timesheets.component.css']
})
export class ManageTimesheetsComponent implements OnInit {

  public timesheetList: Timesheet[] = []
  public users: User[] = []

  constructor(private apiService: ApiService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.apiService.GetTimesheetListByStatus('P').subscribe(
      response => {
        console.log('aaaaaaaaaaaaaaa')
        this.timesheetList = response;
        this.timesheetList.map(sheet => {
          console.log('bbbbbbbbbb')
          this.apiService.getUserById(Number(sheet.userId)).subscribe(
            response => {
              this.users.push(response);
            }
          )
        })
      }
    )
    console.log(this.timesheetList)
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
