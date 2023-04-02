import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {IEditProfileDialogData} from "../../interfaces/files/IEditProfileDialogData";
import {FileService} from "../../services/file.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  defaultImage: string = "url('assets/avatar_placeholder.png')";

  constructor( @Inject(MAT_DIALOG_DATA) public data: IEditProfileDialogData,
               private fileService: FileService,
               private _snackBar: MatSnackBar,
               private authService: AuthService,
               public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    const file:File = event.target.files[0];
    if (file){
      this.data.imageToShow = "url('" + URL.createObjectURL(file) + "')";
      const formData = new FormData();
      formData.append("file", file);
      this.fileService.uploadFile(formData, this.data.username).subscribe(()=>{
        this._snackBar.open('Файл успешно загружен','', {duration: 2*1000})
        localStorage.setItem('hasAvatar', 'true');
        this.authService.hasAvatar.next('true');
      });
    }
  }

}
