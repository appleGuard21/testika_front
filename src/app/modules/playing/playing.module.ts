import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play/play.component';
import { FinishComponent } from './finish/finish.component';
import {RouterModule, Routes} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {authGuard} from "../../services/authGuard";
import {CheckAnswerDirective} from "../../directives/check-answer.directive";
import {MatGridListModule} from "@angular/material/grid-list";

const routes: Routes = [
  { path: 'play/:id', component: PlayComponent, canActivate: [authGuard]},
  { path: 'finish', component: FinishComponent, canActivate: [authGuard]}
];

@NgModule({
  declarations: [
    PlayComponent,
    FinishComponent,
    CheckAnswerDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    PlayComponent,
    FinishComponent,
    RouterModule
  ]
})
export class PlayingModule { }
