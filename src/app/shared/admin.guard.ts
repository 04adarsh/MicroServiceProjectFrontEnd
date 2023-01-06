import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router,private toastr:ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles=this.userService.getUserRoles();
    let isLoggedIn=this.userService.isLoggedIn();
    if(isLoggedIn && roles?.includes("ROLE_ADMIN")){
      return true;
    }
    else if(isLoggedIn && (roles?.includes("ROLE_ADMIN") && roles.includes("ROLE_USER"))){
      return true;
    }
    this.router.navigate(['login']);
      return false;
   

  }
  
}
