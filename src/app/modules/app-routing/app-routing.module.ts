import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../../components/home/home.component";
import {GreetingComponent} from "../../components/greeting/greeting.component";
import {authGuard} from "../../services/authGuard";
import {TasksComponent} from "../../components/tasks/tasks.component";
import {ContactsComponent} from "../../components/contacts/contacts.component";
import {StatisticComponent} from "../../components/statistic/statistic.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'greeting', component: GreetingComponent},
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard]},
  { path: 'contacts', component: ContactsComponent, canActivate: [authGuard]},
  { path: 'statistic', component: StatisticComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'greeting', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
