import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../../services/contact.service";
import {IAddContactRequest} from "../../interfaces/contact/IAddContactRequest";
import {AuthService} from "../../services/auth.service";
import {ModalService} from "../../services/modal.service";
import {UserExistsValidator} from "../../validators/UserExistsValidator";
import {IAppUser} from "../../interfaces/auth/IAppUser";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  myForm = this.fb.group({
    name: ['', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.minLength(4)],
      asyncValidators: this.userExistsValidator.validate.bind(this.userExistsValidator)
    }]
  });
  username = '';
  noSuchUser = '';
  @Output() newContactEvent = new EventEmitter<IAppUser>();

  constructor(private contactService: ContactService,
              private authService: AuthService,
              private modalService: ModalService,
              private userExistsValidator:  UserExistsValidator,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data;
      }
    });

  }

  get name(){
    return this.myForm.controls.name;
  }

  addContact(){
    if(!this.myForm.pending && this.myForm.valid){
      const contact: string = this.name.value as string
      const request: IAddContactRequest = {
        contact: contact, username: this.username
      }
      this.contactService.addContact(request).subscribe(contact=>{
        this.newContactEvent.emit(contact);
        this.modalService.close();
      });
    }
  }

  getLoginErrorMessage() {
    if (this.myForm.controls.name.hasError('required')) {
      return 'Введите имя пользователя';
    }
    if (this.myForm.controls.name.hasError('minlength')) {
      return 'Логин должен содержать не менее 4 символов';
    }
    if (this.myForm.controls.name.hasError('isExists')) {
      return 'Пользователь ' + this.myForm.controls.name.value + ' не найден';
    }
    return '';
  }
}
