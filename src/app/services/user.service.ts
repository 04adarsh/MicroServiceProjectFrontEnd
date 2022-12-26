import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {



 private BASE_URL="http://localhost:9090";



  constructor(private http:HttpClient,private router:Router) { }


  registerUser(data:any){
    return this.http.post(`${this.BASE_URL}/app/register`,data);
  }

  loginUser(loginData:any){
    return this.http.post(`${this.BASE_URL}/app/login`,loginData);
  }

  generateRefreshToken(){

  
    let refreshtokenBody={
      refreshToken:this.getRefreshToken()
    }
  
    return this.http.post(`${this.BASE_URL}/app/refreshtoken`,refreshtokenBody);
  }

  saveAccessToken(accessToken:string){
    return localStorage.setItem('accessToken',accessToken);
  }

  saveRefreshToken(refreshToken:string){
    return localStorage.setItem('refreshToken',refreshToken);
  }

  clear(){
    return localStorage.clear();
  }
  public getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken(){
    return localStorage.getItem('refreshToken');
    
  }

  public saveTokens(accessToken:string,refreshToken:string){
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('refreshToken',refreshToken);
    return true;
  }

  isLoggedIn(){
    return this.getAccessToken();
  }

  logout():void{
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
