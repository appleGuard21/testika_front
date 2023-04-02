import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTestComponent } from './create-test.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { UpdateTestComponent } from './update-test/update-test.component';
import {authGuard} from "../../services/authGuard";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const routes: Routes = [
  { path: 'create-test', component: CreateTestComponent, canActivate: [authGuard]},
  { path: 'update-test/:id', component: UpdateTestComponent, canActivate: [authGuard]}

];

@NgModule({
  declarations: [
    CreateTestComponent,
    UpdateTestComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatGridListModule,
        MatSlideToggleModule
    ],
  exports: [
    CreateTestComponent,
    RouterModule
  ]
})
export class CreateTestModule { }
