import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  private url: string = 'http://localhost:8080/api/v1/app_user/';

  constructor(private http: HttpClient) { }

  isLoginTaken(login: string):Observable<boolean>{
    return this.http.get<boolean>(this.url+'isLoginExist/'+login);
  }
  isEmailExist(email: string):Observable<boolean>{
    return this.http.get<boolean>(this.url+'isEmailExist/'+email);
  }
}
