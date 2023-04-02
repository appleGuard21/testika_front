import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {AuthService} from "../../services/auth.service";
import {IAppUser} from "../../interfaces/auth/IAppUser";
import {ModalService} from "../../services/modal.service";
import {IDeleteContactRequest} from "../../interfaces/contact/IDeleteContactRequest";
import {ITest} from "../../interfaces/test/ITest";
import {TestService} from "../../services/test.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: IAppUser[] = [];
  username: string = '';
  search: string = '';
  myTests: ITest[] = [];


  constructor(private contactService: ContactService,
              private authService: AuthService,
              public modalService: ModalService,
              private dataService: TestService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data
      }
    });
    this.contactService.getContacts(this.username).subscribe(data=>{
      this.contacts = data
    });
    this.dataService.getAllTests(this.username).subscribe((data: ITest[])=>this.myTests = data);
  }

  openDialog() {
    this.modalService.open()
  }

  pushContactToList(contact: IAppUser){
    this.contacts = [...this.contacts, contact]
  }

  deleteContact(contact: string) {
    const request: IDeleteContactRequest = {
      contact: contact, username: this.username
    }
    this.contactService.deleteContact(request).subscribe(()=>{
      this.contacts = this.contacts.filter(c=>c.username !== contact);
    });
  }


}
