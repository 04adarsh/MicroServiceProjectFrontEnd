import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup} from "@angular/forms"
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
      username:[''],
      password:['']
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
      this.userService.saveTokens(accessToken,refreshToken);
      this.route.navigate(['dashboard']);
    },err=>{
      console.log(err);
    })

  }




}
