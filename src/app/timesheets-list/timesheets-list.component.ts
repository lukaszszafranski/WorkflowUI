import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../services/api.service';
import { User } from '../../app/models/user'
import { Timesheet } from '../models/timesheet';
import { mapMonth, mapStatus } from './timesheet-list.utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
    console.log((localStorage.getItem("currentUser") as unknown as User).id)
    this.userId = (JSON.parse(localStorage.getItem("currentUser"))as unknown as User).id.toString()
    this.apiService.GetTimesheetList(this.userId).subscribe(response => {
      this.timesheetList = response;
      console.log(response)
    })
  
  }

  addTimesheet(){
    this.apiService.CreateTimesheet({month: 5, year: 2025, timesheetStatus: 'N', userId: this.userId} as Timesheet).subscribe(
      val => {
        console.log('dupa dupaa 12345')
        console.log(val)
        this.router.navigate([`/timesheet/${(val as Timesheet).timesheetID}`])
      }, error => console.log(error)
    )
  }

  mapMonth(month: number): string {
    return mapMonth(month);
  }

  mapStatus(status: string): string {
    return mapStatus(status);
  }

}
