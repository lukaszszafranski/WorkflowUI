import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-timesheets-list',
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.css']
})
export class TimesheetsListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addTimesheet(){
    this.apiService.CreateTimesheet({timesheetID: 1, month: 1, year: 2023}).subscribe(
      val => {
        console.log(val)
      }, error => console.log(error)
    )
  }

}
