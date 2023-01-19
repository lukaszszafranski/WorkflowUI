import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../models/Project';
import { Timesheet } from '../models/timesheet';
import { TimesheetDetails } from '../models/timesheet-details';
import { ApiService } from '../services/api.service';
import { mapMonth, mapStatus } from '../timesheets-list/timesheet-list.utils';

@Component({
  selector: 'app-manage-timesheet-details',
  templateUrl: './manage-timesheet-details.component.html',
  styleUrls: ['./manage-timesheet-details.component.css']
})
export class ManageTimesheetDetailsComponent implements OnInit {

  private gridApi: GridApi;
  private days = []
  private timesheetId: string
  public totalHours = 0;
  public hoursReported = 0;
  public projectList: Project[] = [];
  public projectForm: FormGroup;
  public month = 0
  public year = 1;
  public timesheet: Timesheet;
  public timesheetDetails: TimesheetDetails[];
  public name = '';
  public surname = '';

  constructor(
    private apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      projectName: [null, Validators.required],
  });

  }

  public defaultColDef: ColDef = {
    // width: 45,
    // cellStyle: {border: '1px solid'}
    suppressMovable: true,
    editable: false
  };

  public decline(){
    this.spinner.show()
    const timesheet = {
      timesheetID: this.timesheet.timesheetID,
      timesheetStatus: 'U',
      userId: this.timesheet.userId,
      month: this.timesheet.month,
      year: this.timesheet.year
    } as Timesheet

    this.apiService.UpdateTimeSheet(timesheet).subscribe(
      val => {
        this.timesheet.timesheetStatus = timesheet.timesheetStatus
        this.toastr.success('Timesheet has been declined!')
        this.spinner.hide()
      }
    );
  }

  public approve() {
    this.spinner.show()

    const timesheet = {
      timesheetID: this.timesheet.timesheetID,
      timesheetStatus: 'A',
      userId: this.timesheet.userId,
      month: this.timesheet.month,
      year: this.timesheet.year
    } as Timesheet

    this.apiService.UpdateTimeSheet(timesheet).subscribe(
      val => {
        this.timesheet.timesheetStatus = timesheet.timesheetStatus
        this.toastr.success('Timesheet has been approved!')
        this.spinner.hide()
      }
    );

  }

  onGridReady(event: GridReadyEvent){
    this.spinner.show()
    this.gridApi = event.api;

    this.timesheetId = this.route.snapshot.paramMap.get('timesheetID')

    this.apiService.GetTimesheetById(this.timesheetId).subscribe(
      val => {
        let projectNames = []
        this.timesheet = val[0]
        this.timesheetDetails = val[0].timesheetDetails
        this.month = val[0].month
        this.year = val[0].year
        this.timesheetDetails.forEach(sheet => {
          this.hoursReported += sheet.registeredHours
        })

        this.apiService.getUserById(Number(this.timesheet.userId)).subscribe(
          response => {
            this.name = response.firstName;
            this.surname = response.lastName;
          }
        )

        this.timesheetDetails.map(
          sheetDetails => {
            if(!projectNames.includes(sheetDetails.projectTitle)){
              projectNames.push(sheetDetails.projectTitle)
            }
          }
        )
        let rowData = []
        projectNames.forEach(project => {
          let hours = []
          this.timesheetDetails.forEach(
            sheetDetails => {
              if(project == sheetDetails.projectTitle){
                hours.push({day: sheetDetails.day, hours: sheetDetails.registeredHours});
              }
            }
          )
          let temp = []
          temp.push({projectTitle: project, dupa: hours.reduce(
            (obj, item) => Object.assign(obj, { ['day' + item.day]: item.hours }), {})})
          rowData.push(Object.assign({}, ...function _flatten(o) { return [].concat(...Object.keys(o).map(k => typeof o[k] === 'object' ? _flatten(o[k]) : ({[k]: o[k]})))}(temp)))
        })
        this.gridApi.setRowData(rowData)

        const date = new Date(this.timesheet.year, this.timesheet.month - 1, 1);
        while(date.getMonth() === this.timesheet.month - 1){
          let curDate = new Date(date)
          this.days.push({day: curDate.getDate(), isWeekendDay: (curDate.getDay() == 6 || curDate.getDay() == 0) ? true : false});
          date.setDate(date.getDate() + 1)
        }
    
        this.gridApi.setColumnDefs(this.createColumnsDef(this.days))
        this.spinner.hide()
      }
      
    )

    this.apiService.GetAllProjects().subscribe(response => {
      this.projectList = response
    })

  }

  private createColumnsDef(days: {day: number, isWeekendDay: boolean}[]): ColDef[]{
    let colsDef: ColDef[] = []
    colsDef.push( { field: 'projectTitle', headerName: 'Project Name', cellStyle: {border: '1px solid'} })
    days.forEach(currDay => {
      if(!currDay.isWeekendDay){
        colsDef.push({ field: 'day' + currDay.day.toString(), headerName: currDay.day.toString(), width: 55, cellStyle: {border: '1px solid', "text-align": 'center'} })
        this.totalHours += 8;
      } else {
        colsDef.push({ field: currDay.day.toString(), width: 55, suppressSizeToFit: true, cellStyle: {border: '1px solid', background: 'lightGray', "text-align": 'center'} },)
      }
    })

    colsDef.push( { headerName: 'Total', width: 100, cellStyle: {border: '1px solid'},
      field: 'total',
      valueGetter: params =>{
        return Number(params.data.day1 ?? 0) + Number(params.data.day2 ?? 0) + Number(params.data.day3 ?? 0) + Number(params.data.day4 ?? 0) + Number(params.data.day5 ?? 0) + Number(params.data.day6 ?? 0) +
        Number(params.data.day7 ?? 0) + Number(params.data.day8 ?? 0) + Number(params.data.day9 ?? 0) + Number(params.data.day10 ?? 0) + Number(params.data.day11 ?? 0) + Number(params.data.day12 ?? 0) +
        Number(params.data.day13 ?? 0) + Number(params.data.day14 ?? 0) + Number(params.data.day15 ?? 0) + Number(params.data.day16 ?? 0) + Number(params.data.day17 ?? 0) + Number(params.data.day18 ?? 0) +
        Number(params.data.day19 ?? 0) + Number(params.data.day20 ?? 0) + Number(params.data.day21 ?? 0) + Number(params.data.day22 ?? 0) + Number(params.data.day23 ?? 0) + Number(params.data.day24 ?? 0) +
        Number(params.data.day25 ?? 0) + Number(params.data.day26 ?? 0) + Number(params.data.day27 ?? 0) + Number(params.data.day28 ?? 0) + Number(params.data.day29 ?? 0) + Number(params.data.day30 ?? 0) +
        Number(params.data.day31 ?? 0)
      }
    })

    
    return colsDef;
  }

  mapMonth(month: number): string {
    return mapMonth(month);
  }

  mapStatus(status: string): string {
    return mapStatus(status);
  }

}
