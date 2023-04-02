import { Pipe, PipeTransform } from '@angular/core';
import {ITest} from "../interfaces/test/ITest";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tests: ITest[], search: string): ITest[] {
    return tests.filter(t=>t.title.toLowerCase().includes(search.toLowerCase()));
  }

}
