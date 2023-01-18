import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Project } from '../models/Project';
import { Timesheet } from '../models/timesheet';
import { TimesheetDetails } from '../models/timesheet-details';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { mapMonth } from '../timesheets-list/timesheet-list.utils';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.css']
})
export class TimesheetDetailsComponent implements OnInit {

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

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      projectName: [null, Validators.required],
  });

  }

  public defaultColDef: ColDef = {
    // width: 45,
    // cellStyle: {border: '1px solid'}
    singleClickEdit: true,
    suppressMovable: true,
  };

  public saveDraft(){
    this.gridApi.selectAll();
    const request = this.gridApi.getSelectedRows();
    this.gridApi.deselectAll();


  
    let timesheetDetailsArray: TimesheetDetails[] = []
    request.forEach(
      project => {
        project.day1 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 1, registeredHours: Number(project.day1), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day2 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 2, registeredHours: Number(project.day2), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day3 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 3, registeredHours: Number(project.day3), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day4 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 4, registeredHours: Number(project.day4), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day5 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 5, registeredHours: Number(project.day5), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day6 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 6, registeredHours: Number(project.day6), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day7 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 7, registeredHours: Number(project.day7), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day8 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 8, registeredHours: Number(project.day8), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day9 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 9, registeredHours: Number(project.day9), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day10 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 10, registeredHours:  Number(project.day10), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day11 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 11, registeredHours:  Number(project.day11), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day12 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 12, registeredHours:  Number(project.day12), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day13 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 13, registeredHours:  Number(project.day13), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day14 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 14, registeredHours:  Number(project.day14), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day15 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 15, registeredHours:  Number(project.day15), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day16 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 16, registeredHours:  Number(project.day16), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day17 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 17, registeredHours:  Number(project.day17), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day18 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 18, registeredHours:  Number(project.day18), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day19 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 19, registeredHours:  Number(project.day19), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day20 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 20, registeredHours:  Number(project.day20), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day21 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 21, registeredHours:  Number(project.day21), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day22 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 22, registeredHours:  Number(project.day22), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day23 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 23, registeredHours:  Number(project.day23), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day24 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 24, registeredHours:  Number(project.day24), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day25 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 25, registeredHours:  Number(project.day25), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day26 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 26, registeredHours:  Number(project.day26), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day27 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 27, registeredHours:  Number(project.day27), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day28 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 28, registeredHours:  Number(project.day28), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day29 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 29, registeredHours:  Number(project.day29), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day30 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 30, registeredHours:  Number(project.day30), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day31 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 31, registeredHours:  Number(project.day31), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
      }
    )

    this.apiService.UpdateTimeSheetDetails(timesheetDetailsArray).subscribe(
      val => {
        this.hoursReported = 0;
        timesheetDetailsArray.forEach(detail => {
          this.hoursReported += detail.registeredHours;
        })
      }
    );
  }

  public onSubmit() {
    this.gridApi.selectAll();
    const request = this.gridApi.getSelectedRows();
    this.gridApi.deselectAll();


  
    let timesheetDetailsArray: TimesheetDetails[] = []
    request.forEach(
      project => {
        project.day1 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 1, registeredHours: Number(project.day1), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day2 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 2, registeredHours: Number(project.day2), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day3 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 3, registeredHours: Number(project.day3), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day4 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 4, registeredHours: Number(project.day4), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day5 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 5, registeredHours: Number(project.day5), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day6 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 6, registeredHours: Number(project.day6), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day7 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 7, registeredHours: Number(project.day7), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day8 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 8, registeredHours: Number(project.day8), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day9 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 9, registeredHours: Number(project.day9), timesheetId: Number(this.timesheetId)} as TimesheetDetails) : null
        project.day10 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 10, registeredHours:  Number(project.day10), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day11 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 11, registeredHours:  Number(project.day11), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day12 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 12, registeredHours:  Number(project.day12), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day13 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 13, registeredHours:  Number(project.day13), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day14 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 14, registeredHours:  Number(project.day14), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day15 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 15, registeredHours:  Number(project.day15), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day16 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 16, registeredHours:  Number(project.day16), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day17 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 17, registeredHours:  Number(project.day17), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day18 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 18, registeredHours:  Number(project.day18), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day19 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 19, registeredHours:  Number(project.day19), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day20 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 20, registeredHours:  Number(project.day20), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day21 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 21, registeredHours:  Number(project.day21), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day22 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 22, registeredHours:  Number(project.day22), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day23 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 23, registeredHours:  Number(project.day23), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day24 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 24, registeredHours:  Number(project.day24), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day25 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 25, registeredHours:  Number(project.day25), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day26 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 26, registeredHours:  Number(project.day26), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day27 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 27, registeredHours:  Number(project.day27), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day28 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 28, registeredHours:  Number(project.day28), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day29 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 29, registeredHours:  Number(project.day29), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day30 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 30, registeredHours:  Number(project.day30), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
        project.day31 != null ? timesheetDetailsArray.push({projectTitle: project.projectTitle, day: 31, registeredHours:  Number(project.day31), timesheetId:  Number(this.timesheetId)} as TimesheetDetails) : null
      }
    )

    const timesheet = {
      timesheetID: this.timesheet.timesheetID,
      timesheetStatus: 'P',
      userId: this.timesheet.userId,
      month: this.timesheet.month,
      year: this.timesheet.year
    } as Timesheet

    this.apiService.UpdateTimeSheetDetails(timesheetDetailsArray).subscribe(
      val => {
        this.apiService.UpdateTimeSheet(timesheet).subscribe(
          val => {
            this.router.navigate([`/timesheets-list`])
          }
        );
      }
    );

  }


  public addNewProject() {


    if(this.projectForm.valid){
      this.gridApi.applyTransaction({add: [{projectTitle: this.projectForm.controls['projectName'].value.title}]})
      let closeButton = document.getElementById('closeButton');
      this.projectForm.patchValue({projectName: [null]})
      closeButton.click();
    }
  }

  onGridReady(event: GridReadyEvent){
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
        colsDef.push({ field: 'day' + currDay.day.toString(), headerName: currDay.day.toString(), width: 55, cellStyle: {border: '1px solid', "text-align": 'center'}, aggFunc: "sum", editable: true })
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
      }, aggFunc: "sum"
    })

    
    return colsDef;
  }

  mapMonth(month: number): string {
    return mapMonth(month);
  }

}
