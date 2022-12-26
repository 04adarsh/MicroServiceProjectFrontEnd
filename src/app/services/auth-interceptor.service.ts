import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{



  constructor(private userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=this.userService.getAccessToken();

    let authreq=req;
    if(token){
     
      authreq=this.addTokenHeader(req,token);
      return next.handle(authreq).pipe(
        catchError((errordata:any)=>{
          if(errordata.status===401){

           return  this.handleRefreshToken(req,next);
          }
          return throwError(errordata);
        })
      );

    }


   
 return next.handle(authreq);
  }

 handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){

 return this.userService.generateRefreshToken().pipe(
  switchMap((data:any)=>{
    let accessToken=data.accessToken;
    let refreshToken=data.refreshToken;
    this.userService.saveTokens(accessToken,refreshToken);
    return next.handle(this.addTokenHeader(req,accessToken));
  }),
  catchError(errordata=>{
    this.userService.logout();
    return throwError(errordata);
  })
 
);


  }

  addTokenHeader(req: HttpRequest<any>,accessToken:any){
    return req.clone({ headers:req.headers.set('Authorization',accessToken)})
  }
      
}
