import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITest} from "../../../interfaces/test/ITest";
import {Router} from "@angular/router";
import {FileService} from "../../../services/file.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() test:ITest = {author: "", questions: [], title: ""}
  @Output() deleteEvent = new EventEmitter<number>();
  testImage: any = '';

  constructor(private router: Router,
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

  play() {
    this.router.navigate(['play', this.test.id], {queryParams: {'from': 'tasks'}})
  }

  deleteTask() {
    this.deleteEvent.emit(this.test.id);
  }
}
