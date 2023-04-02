import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TestService} from "../../../services/test.service";
import {ITest} from "../../../interfaces/test/ITest";
import {Router} from "@angular/router";
import {IGiveTaskRequest} from "../../../interfaces/task/IGiveTaskRequest";
import {IAppUser} from "../../../interfaces/auth/IAppUser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../../../services/file.service";
import {DomSanitizer} from "@angular/platform-browser";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() test:ITest = {author: "", questions: [], title: ""}
  @Output() deleteEvent = new EventEmitter<number>();
  @Input() contacts: IAppUser[] = [];
  testImage: any = '';

  constructor(private dataService: TestService,
              private taskService: TaskService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private fileService: FileService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.test.imageName){
      this.fileService.downloadFile(this.test.imageName).subscribe(data=>{
        if(data){
          let objectURL = URL.createObjectURL(data);
          this.testImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      })
    }
  }

  deleteTest() {
    this.deleteEvent.emit(this.test.id);
  }

  play() {
    this.router.navigate(['play', this.test.id], {queryParams: {'from': 'home'}})
  }

  updateTest() {
    this.router.navigate(['update-test', this.test.id])
  }

  giveTask(contact: string) {
    if(this.test.id){
      const request: IGiveTaskRequest = {solver: contact, testId: this.test.id}
      this.taskService.giveTask(request).subscribe(()=>{
        this._snackBar.open('Задание успешно отправлено','', {duration: 2*1000})
      });
    }
  }

}
