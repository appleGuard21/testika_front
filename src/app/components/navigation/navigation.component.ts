import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FileService} from "../../services/file.service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  username: string = '';
  hasAvatar: boolean = false;
  imageToShow: any;
  @Output() drawerEvent = new EventEmitter<string>();

  constructor(private authService: AuthService,
              private fileService: FileService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.username.subscribe(data=>{
      if(data){
        this.username = data;
      }
    });
    this.authService.hasAvatar.subscribe(hasAvatar=>{
      if(hasAvatar){
        console.log(hasAvatar)
        this.hasAvatar = true;
        this.onDownLoadFile(this.username+'_avatar.jpg');
      }
    });
  }

  onDownLoadFile(fileName: string){
    this.fileService.downloadFile(fileName)
      .subscribe(data=>{
        if(data){
          this.createImageFromBlob(data);
        }
      });
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = "url('" + reader.result +"')";
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  openDrawer() {
    this.drawerEvent.emit();
  }
  logout() {
    this.authService.logout();
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {data: {username: this.username, imageToShow: this.imageToShow}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.imageToShow = result
      }
    });
  }

}
