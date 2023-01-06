import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn!:any;
  username:any;

  ngOnInit(){
this.isLoggedIn=this.userService.isLoggedIn();
this.username=this.userService.getUserName();

  }
  constructor(private userService:UserService){}

doLogout(){
  this.userService.logout();
}
}
