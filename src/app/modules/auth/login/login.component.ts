import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {IAuthRequest} from "../../../interfaces/auth/IAuthRequest";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  message: string = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.loginForm.pending && this.loginForm.valid){
      const request: IAuthRequest = this.loginForm.value as unknown as IAuthRequest;
      this.authService.login(request)
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe(response=>{
        if(response){
          this.router.navigate(['home'])
        }
      });

    }
  }

  getLoginErrorMessage() {
    if (this.loginForm.controls.username.hasError('required')) {
      return 'Введите логин';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Введите пароль';
    }
    return '';
  }
  private handleError(error: HttpErrorResponse){
    this.loginForm.setErrors({ unauthenticated: true });
    return throwError(() => new Error(error.message));
  }

  toStart() {
    this.router.navigate([''])
  }
}
