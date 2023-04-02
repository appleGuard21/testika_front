import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFileData} from "../interfaces/files/IFileData";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url: string = 'http://localhost:8080/api/v1/files/';

  constructor(private http: HttpClient) {
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(this.url + 'download/' + fileName, {
      responseType: 'blob'
    });
  }

  uploadFile(formData: FormData, username: string):Observable<any>{
    return this.http.post(this.url+'uploadAvatar/'+username, formData);
  }
  uploadTestImage(formData: FormData):Observable<IFileData>{
    return this.http.post<IFileData>(this.url+'uploadTestImage', formData);
  }
}
