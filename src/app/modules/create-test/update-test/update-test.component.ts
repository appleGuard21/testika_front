import { Component, OnInit } from '@angular/core';
import {ITest} from "../../../interfaces/test/ITest";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TestService} from "../../../services/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../../services/file.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {

  backgroundImage: any = '';
  defaultImage: string = "url('assets/svg/cardDefaultImage.svg')"
  formData: FormData;

  test:ITest = {
    author: "",
    id: 0, questions: [], title: ""
  }

  id: number = 0;

  testForm = this.fb.group({
    id:[0],
    title: ['', Validators.required],
    questions: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private dataService: TestService,
              private router: Router,
              private route: ActivatedRoute,
              private fileService: FileService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=> this.id = params['id']);
    if (this.id) {
      this.dataService.getTest(this.id).subscribe((data: ITest) => {
        this.test = data;
        this.testForm.controls.title.setValue(this.test.title as string);
        this.testForm.controls.id.setValue(this.test.id as number)
        this.test.questions.forEach((question, i) => {
          this.questions.push(this.fb.group({
            id:[question.id],
            title: [question.title, Validators.required],
            answers: this.fb.array([])
          }));
          question.answers.forEach((answer, j) => {
            this.answers(i).push(this.fb.group({
              id:[answer.id],
              title: [answer.title, Validators.required],
              right: [answer.right]
            }))
          });
        });
        if(this.test.imageName){
          this.fileService.downloadFile(this.test.imageName).subscribe(data=>{
            if(data){
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                this.backgroundImage = "url('" + reader.result +"')";
              }, false);

                reader.readAsDataURL(data);
            }
          })
        }
      });
    }else console.warn('there is no id')
  }

  get questions(){
    return this.testForm.get('questions') as FormArray
  }


  answers(index:number){
    const ansArr = this.questions.controls.filter((question, i) => index === i);
    const question = ansArr.pop() as FormGroup;
    return  question.get('answers') as FormArray;
  }

  onSubmit() {
    this.test = this.testForm.value as unknown as ITest;
    if(this.formData){
      this.fileService.uploadTestImage(this.formData).subscribe(data=>{
        this.test.imageName = data.name;
        this.dataService.updateTest(this.test).subscribe(()=>{
          this.testForm.reset();
          this.router.navigate(['']);
        });
      });
    }else {
      this.dataService.updateTest(this.test).subscribe(()=>{
        this.testForm.reset();
        this.router.navigate(['']);
      });
    }
  }

  onAddQuestion() {
    this.questions.push( this.fb.group({
      title: ['', Validators.required],
      answers: this.fb.nonNullable.array([
        this.fb.nonNullable.group({
          title: ['', Validators.required],
          right: [false]
        })
      ])
    }));
  }

  onAddAnswer(index: number) {
    this.answers(index).push(this.fb.nonNullable.group({
      title: ['', Validators.required],
      right: [false]
    }));
  }

  onDeleteAnswer(questionIndex:number, answerIndex: number) {
    this.answers(questionIndex).removeAt(answerIndex);
  }

  onDeleteQuestion(questionIndex: number) {
    this.questions.removeAt(questionIndex);
  }

  onFileChange(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.backgroundImage = "url('" + URL.createObjectURL(file) + "')";
      const formData = new FormData();
      formData.append("file", file);
      this.formData = formData;
    }
  }
}
