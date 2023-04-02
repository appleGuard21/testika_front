import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {UserValidationService} from "../services/userValidation.service";

@Injectable({
  providedIn: 'root'
})
export class LoginIsTakenValidatorService implements AsyncValidator{

  constructor(private userService: UserValidationService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isLoginTaken(control.value).pipe(
      map(isTaken=> isTaken ? {isTaken: true} : null),
      catchError(()=>of(null))
    );
  }
}
