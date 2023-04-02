import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data=>{
      if(data){
        this.router.navigate(['home'])
      }
    });
  }

  toRegistration() {
    this.router.navigate(['register'])
  }
  toLogin() {
    this.router.navigate(['login'])
  }
}
