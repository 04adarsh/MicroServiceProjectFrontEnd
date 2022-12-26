import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestingService {

  constructor(private http:HttpClient) { }

  doTesting(){
   return this.http.get("http://localhost:9090/testing");
  }
}
