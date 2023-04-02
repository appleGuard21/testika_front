import { Injectable } from '@angular/core';
import {ITest} from "../interfaces/test/ITest";

@Injectable({
  providedIn: 'root'
})
export class PlayingService {

  test: ITest = {
    author: "", id: 0, questions: [], title: ""
  }

  constructor() { }
}
