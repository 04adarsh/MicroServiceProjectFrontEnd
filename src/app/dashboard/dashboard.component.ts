import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestingService } from '../services/testing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


 test={
  response:"",
 };
  constructor(private testing:TestingService,private router:Router,private toastr:ToastrService){}

  ngOnInit(){
  
  }


  doTesting(){
    this.testing.doTesting().subscribe((res:any)=>{
      console.log(res);
      this.test.response=res.response;
      this.toastr.success('Success', 'Testing Successfull');
      this.router.navigate(['']);
  
    })
  }

}
