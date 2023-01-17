import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Project } from '../models/Project';
import { TimesheetDetails } from '../models/timesheet-details';
import { ApiService } from '../services/api.service';

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
  public projectList: Project[] = [];
  public projectForm: FormGroup;
  public timesheetDetails: TimesheetDetails;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.timesheetId = this.route.snapshot.paramMap.get('timesheetID')
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    console.log(this.route.snapshot.paramMap.get('timesheetID'))


    this.apiService.GetTimesheetById(this.timesheetId).subscribe(
      val => {
        console.log(val)
        this.timesheetDetails = val.timesheetDetails
      }
    )

    this.apiService.GetAllProjects().subscribe(response => {
      this.projectList = response
      console.log(response)
    })

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

  public onSubmit() {
    this.gridApi.selectAll();
    const request = this.gridApi.getSelectedRows();
    console.log(request);
    this.gridApi.deselectAll();


  
    let timesheetDetailsArray: TimesheetDetails[] = []
    request.forEach(
      project => {
        project.day1 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 1, registeredHours: project.day1, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day2 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 2, registeredHours: project.day2, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day3 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 3, registeredHours: project.day3, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day4 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 4, registeredHours: project.day4, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day5 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 5, registeredHours: project.day5, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day6 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 6, registeredHours: project.day6, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day7 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 7, registeredHours: project.day7, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day8 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 8, registeredHours: project.day8, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day9 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 9, registeredHours: project.day9, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day10 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 10, registeredHours: project.day10, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day11 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 11, registeredHours: project.day11, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day12 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 12, registeredHours: project.day12, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day13 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 13, registeredHours: project.day13, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day14 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 14, registeredHours: project.day14, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day15 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 15, registeredHours: project.day15, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day16 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 16, registeredHours: project.day16, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day17 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 17, registeredHours: project.day17, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day18 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 18, registeredHours: project.day18, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day19 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 19, registeredHours: project.day19, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day20 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 20, registeredHours: project.day20, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day21 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 21, registeredHours: project.day21, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day22 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 22, registeredHours: project.day22, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day23 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 23, registeredHours: project.day23, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day24 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 24, registeredHours: project.day24, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day25 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 25, registeredHours: project.day25, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day26 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 26, registeredHours: project.day26, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day27 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 27, registeredHours: project.day27, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day28 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 28, registeredHours: project.day28, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day29 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 29, registeredHours: project.day29, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day30 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 30, registeredHours: project.day30, timesheetId: this.timesheetId} as TimesheetDetails) : null
        project.day31 != null ? timesheetDetailsArray.push({projectTitle: project.projectName, day: 31, registeredHours: project.day31, timesheetId: this.timesheetId} as TimesheetDetails) : null
      }
    )

    console.log('dupa')
    console.log(timesheetDetailsArray);

    this.apiService.UpdateTimeSheet(timesheetDetailsArray).subscribe(
      val => {
        console.log(val)
      }
    );

    // this.gridApi.applyTransaction({add: [{projectName: 'TWOJA STARA'}]})
  }


  public addNewProject() {
    console.log('siema')
    console.log(this.projectForm.value)

    if(this.projectForm.valid){
      this.gridApi.applyTransaction({add: [{projectName: this.projectForm.controls['projectName'].value.title}]})
      let closeButton = document.getElementById('closeButton');
      this.projectForm.patchValue({projectName: [null]})
      closeButton.click();
    }
  }

  onGridReady(event: GridReadyEvent){
    console.log('SIEEEMAAA')
    console.log(event);
    this.gridApi = event.api;

    const date = new Date(2023, 0, 1);
    while(date.getMonth() === 0){
      let curDate = new Date(date)
      this.days.push({day: curDate.getDate(), isWeekendDay: (curDate.getDay() == 6 || curDate.getDay() == 0) ? true : false});
      date.setDate(date.getDate() + 1)
    }



    this.gridApi.setColumnDefs(this.createColumnsDef(this.days))

    this.gridApi.setRowData(this.rowData)
  }

  public autoGroupColumnDef: ColDef = {
    // width: 10,
    // resizable: true
    suppressMovable: true,
  
  };

  private createColumnsDef(days: {day: number, isWeekendDay: boolean}[]): ColDef[]{
    let colsDef: ColDef[] = []
    colsDef.push( { field: 'projectName', headerName: 'Project Name', cellStyle: {border: '1px solid'} })
    // colsDef.push( { field: 'total', headerName: 'Total',width: 70 , cellStyle: {border: '1px solid'} })
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

rowData = [

];

}
