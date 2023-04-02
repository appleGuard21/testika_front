import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {IRegistrationRequest} from "../../../interfaces/auth/IRegistrationRequest";
import {LoginIsTakenValidatorService} from "../../../validators/login-is-taken-validator.service";
import {EmailExistsValidatorService} from "../../../validators/email-exists-validator.service";

@Component({
  selector: 'app-auth',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hide: boolean = true;

  registrationForm = this.fb.group({
    username: ['', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: this.loginITakenValidator.validate.bind(this.loginITakenValidator)
  }],
    email: ['', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.email],
      asyncValidators: this.emailExistsValidator.validate.bind(this.emailExistsValidator)
  }],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private loginITakenValidator: LoginIsTakenValidatorService,
              private emailExistsValidator: EmailExistsValidatorService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.registrationForm.pending && this.registrationForm.valid){
      const request: IRegistrationRequest = this.registrationForm.value as unknown as IRegistrationRequest;
      this.authService.register(request).subscribe(response=>{
        if(response.token){
          this.router.navigate(['home'])
        }
      });
    }
  }

  getLoginErrorMessage() {
    if (this.registrationForm.controls.username.hasError('required')) {
      return 'Введите логин';
    }
    if (this.registrationForm.controls.username.hasError('minlength')) {
      return 'Длина логина должна быть не менее 4 символов';
    }
    if (this.registrationForm.controls.username.hasError('isTaken')) {
      return 'Логин занят';
    }
    return '';
  }
  getEmailErrorMessage(){
    if (this.registrationForm.controls.email.hasError('required')) {
      return 'Введите e-mail';
    }
    if (this.registrationForm.controls.email.hasError('email')) {
      return 'Введите корректный e-mail';
    }
    if (this.registrationForm.controls.email.hasError('isExists')) {
      return 'Пользователь с таким e-mail уже существует';
    }
    return '';
  }
  getPasswordErrorMessage(){
    if (this.registrationForm.controls.password.hasError('required')) {
      return 'Введите пароль';
    }
    if (this.registrationForm.controls.password.hasError('minlength')) {
      return 'Длина пароля должна быть не менее 8 символов';
    }
    return '';
  }
  toStart() {
    this.router.navigate([''])
  }

}
