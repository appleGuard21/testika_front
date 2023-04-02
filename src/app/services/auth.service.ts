import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IRegistrationRequest} from "../interfaces/auth/IRegistrationRequest";
import {IAuthRequest} from "../interfaces/auth/IAuthRequest";
import {IAuthResponse} from "../interfaces/auth/IAuthResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private url: string = 'http://localhost:8080/api/v1/auth/';

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  username: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  hasAvatar: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem('hasAvatar'));

  constructor(private http: HttpClient, private router: Router) {}

  register(request: IRegistrationRequest):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.url+'register', request).pipe(
      tap((response: IAuthResponse)=>{
        this.setToken(response);
        this.setLoggedIn(true);
        localStorage.setItem('username', request.username);
        this.setUsername(request.username);
      })
    );
  }

  login(request: IAuthRequest):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.url+'login', request).pipe(
      tap((response: IAuthResponse)=>{
        this.setToken(response);
        this.setLoggedIn(true);
        localStorage.setItem('username', request.username);
        this.setUsername(request.username);
        if(response.hasAvatar){
          localStorage.setItem('hasAvatar', 'true');
          this.hasAvatar.next('true');
        }
      })
    );
  }

  logout(){
      localStorage.clear();
      this.setLoggedIn(false);
      this.setUsername('');
      this.hasAvatar.next('');
      this.router.navigate(['']);
  }

  isAuthenticated():boolean{
    return !!this.token;
  }

  isTokenExpired():boolean{
    if(this.expiresAt){
      return new Date() > new Date(this.expiresAt);
    } else return true;
  }

  get token(){
    if (this.isTokenExpired()){
      return null;
    } else return localStorage.getItem('token');
  }

  get expiresAt(){
    return localStorage.getItem('token-expires-at');
  }

  private setToken(authResponse: IAuthResponse){
      const expiresAt = new Date(authResponse.expiresAt);
      localStorage.setItem('token', 'Bearer '+authResponse.token);
      localStorage.setItem('token-expires-at', expiresAt.toString());
  }

  setLoggedIn(state: boolean){
    this.isLoggedIn.next(state);
  };

  setUsername(username: string){
    this.username.next(username);
  };

  ngOnInit(): void {
    console.log('init')
  }
}
