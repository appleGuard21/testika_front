import {IQuestion} from "./IQuestion";

export interface ITest {
  id?: number,
  title: string,
  questions: IQuestion[],
  author: string
  imageName?:string
}
