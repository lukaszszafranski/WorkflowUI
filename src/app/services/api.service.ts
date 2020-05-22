import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Project } from '../models/Project';
import { column } from '../models/Column';
import { task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) {}

  public GetProjectByID(id: number) {
    return this.httpClient.get<Project>(`${environment.apiUrl}/api/Projects/${id}`).pipe(map(response => {
      return response;
    }));
  }

  public GetAllProjects() {
    return this.httpClient.get<Project[]>(`${environment.apiUrl}/api/Projects`).pipe(map(response => {
      return response;
    }));
  }

  public CreateProject(project: Project) {
    return this.httpClient.post(`${environment.apiUrl}/api/Projects`, project);
  }

  // tslint:disable-next-line: no-shadowed-variable
  public CreateColumn(column: column, projectId: number) {
    return this.httpClient.post(`${environment.apiUrl}/api/Projects/${projectId}/add-column`, column);
  }

  // tslint:disable-next-line: no-shadowed-variable
  public CreateTask(task: task, projectId: number, columnId: number){
    return this.httpClient.post(`${environment.apiUrl}/api/Projects/${projectId}/column/${columnId}/add-task`, task);
  }

  public DeleteProject(projectId: number){
    return this.httpClient.delete(`${environment.apiUrl}/api/Projects/${projectId}`);
  }

  public UpdateProject(projectId: number, project: Project){
    return this.httpClient.put(`${environment.apiUrl}/api/Projects/${projectId}`, project);
  }

  // tslint:disable-next-line: no-shadowed-variable
  public UpdateColumn(projectId: number, columnID: number, column: column){
    return this.httpClient.put(`${environment.apiUrl}/api/Projects/${projectId}/column/${columnID}`, column);
  }

  // tslint:disable-next-line: no-shadowed-variable
  public UpdateTask(projectId: number, columnID: number, taskID: number, task: task){
    return this.httpClient.put(`${environment.apiUrl}/api/Projects/${projectId}/column/${columnID}/task/${taskID}`, task);
  }

  public RemoveColumn(projectId: number, columnID: number){
    return this.httpClient.delete(`${environment.apiUrl}/api/Projects/${projectId}/column/${columnID}`);
  }

  public RemoveTask(projectId: number, columnID: number, taskID: number){
    return this.httpClient.delete(`${environment.apiUrl}/api/Projects/${projectId}/column/${columnID}/task/${taskID}`);
  }
}
