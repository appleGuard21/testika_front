import {IQuestion} from "../interfaces/test/IQuestion";
import {Answer} from "./Answer";

export class Question implements IQuestion{
  private _answers: Answer[];
  private _title: string;


  constructor(answers: Answer[], title: string) {
    this._answers = answers;
    this._title = title;
  }


  get answers(): Answer[] {
    return this._answers;
  }

  set answers(value: Answer[]) {
    this._answers = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
