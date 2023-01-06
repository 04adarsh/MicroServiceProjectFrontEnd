import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-adminpanel-navbar',
  templateUrl: './adminpanel-navbar.component.html',
  styleUrls: ['./adminpanel-navbar.component.css']
})
export class AdminpanelNavbarComponent {

  username:any;
  isLoggedIn:any;

  constructor(private userService:UserService){}

  ngOnInit(){
    this.username=this.userService.getUserName();
    this.isLoggedIn=this.userService.isLoggedIn();
  }


  doLogout(){
    this.userService.logout();
  }

  close(){
    let toggle=document.getElementById("close");
    toggle?.click();
  }
}
