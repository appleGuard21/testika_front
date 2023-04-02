import { Injectable } from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {UserValidationService} from "../services/userValidation.service";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailExistsValidatorService implements AsyncValidator{

  constructor(private userService: UserValidationService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isEmailExist(control.value).pipe(
      map(isExist=> isExist ? {isExists: true} : null),
      catchError(()=>of(null))
    );
  }
}
