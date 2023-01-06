import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {


  users:any;

user={
  id:"",
  username:"",
  email:"",
  roles:[]

}

  constructor(private userService:UserService){
    this.users=this.getAllUsers()

  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res:any)=>{
      console.log(res);
      this.users=res;
    },err=>{
      console.log(err)
    })
  }
}
