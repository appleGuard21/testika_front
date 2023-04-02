import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {signInUpGuard} from "./signInUpGuard";

const routes: Routes = [
  { path: 'register', component: RegistrationComponent, canActivate: [signInUpGuard]},
  { path: 'login', component: LoginComponent, canActivate: [signInUpGuard]}
];

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    RegistrationComponent,
    LoginComponent,
    RouterModule
  ]
})
export class AuthModule { }
