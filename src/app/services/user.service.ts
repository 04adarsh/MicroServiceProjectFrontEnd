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


  getAllUsers(){
    return this.http.get("http://localhost:9090/api/v1/user/get");
  }

  generateRefreshToken(){

  
    let refreshtokenBody={
      refreshToken:this.getRefreshToken()
    }
  
    return this.http.post(`${this.BASE_URL}/app/refreshtoken`,refreshtokenBody);
  }

  saveAccessToken(accessToken:string){
    return window.sessionStorage.setItem("accessToken",accessToken);
  }

  saveRefreshToken(refreshToken:string){
    return window.sessionStorage.setItem('refreshToken',refreshToken);
  }

  clear(){
    return localStorage.clear();
  }
  public getAccessToken() {
    return window.sessionStorage.getItem('accessToken');
  }

  public getRefreshToken(){
    return window.sessionStorage.getItem('refreshToken');
    
  }

  public saveTokens(accessToken:string,refreshToken:string){
    window.sessionStorage.setItem('accessToken',accessToken);
    window.sessionStorage.setItem('refreshToken',refreshToken);
    return true;
  }

  isLoggedIn(){
    return this.getAccessToken();
  }

  logout():void{
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }

saveRoles(roles:any){
  window.sessionStorage.setItem('roles',roles);
  return true;
}

getUserRoles(){
  return window.sessionStorage.getItem('roles');
}

saveUserName(username:string){
  return window.sessionStorage.setItem("username",username);
}

getUserName(){
  return window.sessionStorage.getItem("username");
}

}
