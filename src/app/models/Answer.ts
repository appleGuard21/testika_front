import {IAnswer} from "../interfaces/test/IAnswer";

export class Answer implements IAnswer {
  private _checked: boolean;
  private _right: boolean;
  private _title: string;


  constructor(checked: boolean, right: boolean, title: string) {
    this._checked = checked;
    this._right = right;
    this._title = title;
  }


  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }

  get right(): boolean {
    return this._right;
  }

  set right(value: boolean) {
    this._right = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
