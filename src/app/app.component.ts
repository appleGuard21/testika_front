import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuthenticated: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.next(this.authService.isAuthenticated())
    this.authService.isLoggedIn.subscribe(value=>{
      this.isAuthenticated = value;
    });
  }

}
