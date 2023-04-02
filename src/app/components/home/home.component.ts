import { Component, OnInit } from '@angular/core';
import {ITest} from "../../interfaces/test/ITest";
import {TestService} from "../../services/test.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {IAppUser} from "../../interfaces/auth/IAppUser";
import {ContactService} from "../../services/contact.service";
import {FileService} from "../../services/file.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tests: ITest[] = [];
  username: string =  '';
  contacts: IAppUser[] = [];
  search: string = '';

  constructor(private dataService: TestService,
              private authService: AuthService,
              private contactService: ContactService,
              private router: Router,
              private fileService: FileService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data;
      }
    });
    this.dataService.getAllTests(this.username).subscribe((data: ITest[])=>this.tests = data);
    this.getContacts();
  }

  deleteTest(id: number){
    this.dataService.deleteTest(id).subscribe(()=>this.tests = this.tests.filter(test=> id !== test.id));
  }

  getContacts(){
    this.contactService.getContacts(this.username).subscribe(data=>{
      this.contacts = data;
    })
  }

  newTest() {
    this.router.navigate(['create-test']);
  }

}
