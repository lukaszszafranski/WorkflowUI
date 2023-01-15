import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Project } from '../models/Project';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.css']
})
export class TimesheetDetailsComponent implements OnInit {

  private gridApi: GridApi;
  private days = []
  public totalHours = 0;
  public projectList: Project[] = [];
  public projectForm: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
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
        console.log(params.data.day26)
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
    { projectName: 'dupa0','total': '8' , 'day2': '8' },
    { projectName: 'dupa1', 'day3': '8', 'day4': '8' },
    { projectName: 'dupa2', 'day5': '8', 'day6': '8' },
    { projectName: 'dupa3', 'day16': '8', 'day7': '8' },
    { projectName: 'dupa4', 'day19': '8', 'day8': '8' },
    { projectName: 'dupa5', 'day11': '8', 'day9': '8' },
    { projectName: 'dupa6', 'day13': '8', 'day10': '8' },
];

}
