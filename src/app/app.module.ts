import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { CardComponent } from './components/home/card/card.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {CreateTestModule} from "./modules/create-test/create-test.module";
import {MatListModule} from "@angular/material/list";
import {PlayingModule} from "./modules/playing/playing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {AuthModule} from "./modules/auth/auth.module";
import {InterceptorService} from "./services/interceptor.service";
import { GreetingComponent } from './components/greeting/greeting.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './modal/modal.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FilterUsersByNamePipe } from './pipes/filter-users-by-name.pipe';
import {A11yModule} from "@angular/cdk/a11y";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatBadgeModule} from "@angular/material/badge";
import { StatisticComponent } from './components/statistic/statistic.component';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { ContactComponent } from './components/contact/contact.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CardComponent,
        GreetingComponent,
        NavigationComponent,
        TasksComponent,
        TaskComponent,
        ContactsComponent,
        FilterPipe,
        ModalComponent,
        AddContactComponent,
        FilterUsersByNamePipe,
        StatisticComponent,
        EditProfileComponent,
        ContactComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    CreateTestModule,
    MatListModule,
    PlayingModule,
    HttpClientModule,
    MatInputModule,
    AuthModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    A11yModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatDialogModule,
    ImageCropperModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule
  ],
    providers: [httpInterceptorProviders],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
