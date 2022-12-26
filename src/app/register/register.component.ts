import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formData!:FormGroup;

  user={
    username:"",
    email:"",
    password:"",
    role:['user']

  }

 
  constructor(private route:Router,private userService:UserService,private formBuidler:FormBuilder,private toastr: ToastrService ){}

  ngOnInit():void{
    this.formData=this.formBuidler.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })

    

  }


  registerUser(){
    this.user.username=this.formData.value.username;
    this.user.email=this.formData.value.email;
    this.user.password=this.formData.value.password;

    this.userService.registerUser(this.user).subscribe((res:any)=>{
      this.toastr.success('Success', 'Registration Successfull');
      this.route.navigate(['login']);
      this.formData.reset();
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
