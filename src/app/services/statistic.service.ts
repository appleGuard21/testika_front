import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IStatisticTest} from "../interfaces/statistic/IStatisticTest";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private url:string = 'http://localhost:8080/api/v1/statistic/'

  constructor(private http: HttpClient) { }

  createStatistic(statisticTest: IStatisticTest): Observable<unknown>{
    return this.http.post(this.url+'create', statisticTest);
  }
  getStatistic(username: string): Observable<IStatisticTest[]>{
    return this.http.get<IStatisticTest[]>(this.url+'my/'+username);
  }
  getTasksStatistic(username: string): Observable<IStatisticTest[]>{
    return this.http.get<IStatisticTest[]>(this.url+'tasks/'+username);
  }
}
