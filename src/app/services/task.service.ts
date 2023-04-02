import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGiveTaskRequest} from "../interfaces/task/IGiveTaskRequest";
import {ITest} from "../interfaces/test/ITest";
import {IDeleteTaskRequest} from "../interfaces/task/IDeleteTaskRequest";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = 'http://localhost:8080/api/v1/task/';

  constructor(private http: HttpClient) { }

  giveTask(request: IGiveTaskRequest): Observable<unknown>{
    return this.http.put(this.url+'giveTask', request);
  }

  getTasks(username: string): Observable<ITest[]>{
    return  this.http.get<ITest[]>(this.url+username);
  }

  deleteTask(request: IDeleteTaskRequest):Observable<unknown>{
    return this.http.put(this.url+'deleteTask', request);
  }


}
