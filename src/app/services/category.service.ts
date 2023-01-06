import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  private BASE_URL="http://localhost:9091/api/v1/category/"

  createCategory(category:Object){
    return this.http.post(`${this.BASE_URL}/create`,category);
  }


  getAllCategory(){
    return this.http.get(`${this.BASE_URL}/getAll`);
  }


  updateCategory(id:number,category:Object){
    return this.http.put(`${this.BASE_URL}/update/`+id,category);
  }

  deleteCategory(categoryId:number){
    return this.http.delete(`${this.BASE_URL}/delete/`+categoryId);
  }
}
