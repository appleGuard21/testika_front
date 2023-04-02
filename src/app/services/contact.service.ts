import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAddContactRequest} from "../interfaces/contact/IAddContactRequest";
import {Observable} from "rxjs";
import {IAppUser} from "../interfaces/auth/IAppUser";
import {IDeleteContactRequest} from "../interfaces/contact/IDeleteContactRequest";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: string = 'http://localhost:8080/api/v1/contact/'

  constructor(private http: HttpClient) {}

  addContact(request: IAddContactRequest):Observable<IAppUser>{
    return this.http.post<IAppUser>(this.url+'addContact', request);
  }

  getContacts(username: String):Observable<IAppUser[]>{
    return this.http.get<IAppUser[]>(this.url+'getContacts/'+username);
  }

  deleteContact(request: IDeleteContactRequest):Observable<unknown>{
    return this.http.post(this.url+'deleteContact', request);
  }

}
