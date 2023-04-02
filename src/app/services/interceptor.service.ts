import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    if(token){
      const authReq = req.clone({ setHeaders: { Authorization: token } });
      return next.handle(authReq);
    }else if(!token && localStorage.getItem('token')){
      this.auth.logout();
      return next.handle(req)
    }else return next.handle(req);
  }
}
