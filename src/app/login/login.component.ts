import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginData!:FormGroup;

  loginUser={
    username:"",
    password:""
  }

  constructor(private userService:UserService,private formBuilder:FormBuilder,private route:Router,private toastr: ToastrService){
  }

  ngOnInit(){
    this.loginData=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  userLogin(){
    this.loginUser=this.loginData.value;

    this.userService.loginUser(this.loginUser).subscribe((res:any)=>{
      this.toastr.success('Success', 'Login Successfull!');
      console.log(res);
      this.loginData.reset();
      let accessToken=res.accessToken;
      let refreshToken=res.refreshToken;
      let username=res.username;
      console.log(username)
      this.userService.saveUserName(username);
      this.userService.saveTokens(accessToken,refreshToken);

      this.loginData.reset();
      let roles: Array<string>;
      roles=res.roles;
      this.userService.saveRoles(roles);
      if(roles.includes("ROLE_ADMIN")){
        this.route.navigate(['admin-dashboard'])
      }
      else if(roles.includes("ROLE_USER") && roles.includes("ROLE_ADMIN")){
        this.route.navigate(['admin-dashboard'])
      }
      else{
        this.route.navigate(['dashboard']);
      }
    },err=>{
      this.toastr.error('Error', 'Invalid Credentials');
    })

  }




}
