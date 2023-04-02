import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TestService} from "../../services/test.service";
import {Router} from "@angular/router";
import {ITest} from "../../interfaces/test/ITest";
import {AuthService} from "../../services/auth.service";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})


export class CreateTestComponent implements OnInit {

  backgroundImage: string = '';
  defaultImage: string = "url('assets/svg/cardDefaultImage.svg')"

  test:ITest = {
    questions: [{title:'', answers: [{title: '', right: false}, {title: '', right: false}]},
      {title:'', answers: [{title: '', right: false}, {title: '', right: false}]}], title: "",
    author:''
  }
  author = '';
  formData: FormData;

  testForm = this.fb.group({
    title: ['', Validators.required],
    questions: this.fb.array([
          this.fb.group({
          title: ['', Validators.required],
          answers: this.fb.array([
            this.fb.group({
              title: ['', Validators.required],
              right: [false]
            })
          ])
        })
      ])
  });

  constructor(private fb: FormBuilder,
              private dataService: TestService,
              private router: Router,
              private authService: AuthService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data=>{
      if (!data){
        this.router.navigate([''])
      }
    })
    this.authService.username.subscribe(data=>{
      if(data){
        this.author = data;
      }
    });
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
    this.test.author = this.author;
    if(this.formData){
      this.fileService.uploadTestImage(this.formData).subscribe(data=>{
        this.test.imageName = data.name;
        this.dataService.createTest(this.test).subscribe(()=>{
          this.testForm.reset();
          this.router.navigate(['']);
        });
      });
    }else {
      this.dataService.createTest(this.test).subscribe(()=>{
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
