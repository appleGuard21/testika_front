import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {UserValidationService} from "../services/userValidation.service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserExistsValidator implements AsyncValidator{

  constructor(private userService: UserValidationService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.isLoginTaken(control.value).pipe(
      map(isExists=> isExists ? null : {isExists: true}),
      catchError(()=>of(null))
    );
  }

}

