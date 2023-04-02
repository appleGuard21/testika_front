import { Injectable } from '@angular/core';
import {ITest} from "../interfaces/test/ITest";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Test} from "../models/Test";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url: string = 'http://localhost:8080/api/v1/test/'

  constructor(private http: HttpClient) { }

  getAllTests(username:string): Observable<ITest[]>{
    return this.http.get<ITest[]>(this.url+'getTests/'+username);
  }

  getTest(id:number): Observable<ITest>{
    return this.http.get<ITest>(this.url+'getTest/'+id);
  }

  createTest(test: Test):Observable<ITest>{
    return this.http.post<ITest>(this.url+'createTest', test);
  }

  deleteTest(id: number): Observable<unknown> {
    return this.http.delete(this.url+'deleteTest/'+id);
  }

  updateTest(test: ITest): Observable<ITest>{
    return this.http.put<ITest>(this.url+'updateTest', test);
  }

}
