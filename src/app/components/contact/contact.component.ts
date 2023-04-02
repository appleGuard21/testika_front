import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAppUser} from "../../interfaces/auth/IAppUser";
import {ITest} from "../../interfaces/test/ITest";
import {IGiveTaskRequest} from "../../interfaces/task/IGiveTaskRequest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FileService} from "../../services/file.service";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact: IAppUser;
  @Input() myTests: ITest[];
  @Output() deleteEvent = new EventEmitter<string>();
  imageToShow: any;

  constructor(private taskService: TaskService,
              private _snackBar: MatSnackBar,
              private fileService: FileService) { }

  ngOnInit(): void {
    if (this.contact.avatar){
      this.onDownLoadFile(this.contact.username+'_avatar.jpg');
    }
  }

  deleteContact() {
    this.deleteEvent.emit(this.contact.username);
  }

  giveTask(testId: number | undefined) {
    if(testId){
      const request: IGiveTaskRequest = {solver: this.contact.username, testId: testId}
      this.taskService.giveTask(request).subscribe(()=>{
        this._snackBar.open('Задание успешно отправлено','', {duration: 2*1000})
      })
    }
  }

  onDownLoadFile(fileName: string){
    this.fileService.downloadFile(fileName)
      .subscribe(data=>{
        if(data){
          this.createImageFromBlob(data);
        }
      });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = "url('" + reader.result +"')";
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
