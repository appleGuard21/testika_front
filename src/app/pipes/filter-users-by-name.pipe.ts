import { Pipe, PipeTransform } from '@angular/core';
import {IAppUser} from "../interfaces/auth/IAppUser";

@Pipe({
  name: 'filterUsersByName'
})
export class FilterUsersByNamePipe implements PipeTransform {

  transform(users: IAppUser[], search: string): IAppUser[] {
    return users.filter(u=>u.username.toLowerCase().includes(search.toLowerCase()));
  }

}
