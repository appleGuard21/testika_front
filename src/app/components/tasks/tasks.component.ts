import { Component, OnInit } from '@angular/core';
import {ITest} from "../../interfaces/test/ITest";
import {TestService} from "../../services/test.service";
import {AuthService} from "../../services/auth.service";
import {TaskService} from "../../services/task.service";
import {IDeleteTaskRequest} from "../../interfaces/task/IDeleteTaskRequest";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tests: ITest[] = [];
  username: string = '';
  search: string = '';

  constructor(private dataService: TestService,
              private authService: AuthService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.authService.username.subscribe(data => {
      if (data) {
        this.username = data;
      }
    });
    this.taskService.getTasks(this.username).subscribe(data => {
      this.tests = data;
    });
  }

  deleteTask(testId: number){
    const request: IDeleteTaskRequest = {
      solver: this.username, testId: testId
    }
    this.taskService.deleteTask(request).subscribe(()=>{
      this.tests = this.tests.filter(t=>t.id != testId);
    });
  }
}
