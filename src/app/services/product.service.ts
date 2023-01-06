import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  private BASE_URL="http://localhost:9091/product";

  createProduct(product:any){
    return this.http.post(`${this.BASE_URL}/create`, product);
  }

  getAllProduct(){
    return this.http.get(`${this.BASE_URL}/getAll`);
  }

  updateProduct(id:number,updatedProduct:any){
    return this.http.put(`${this.BASE_URL}/update/`+id,updatedProduct);

  }

  deleteProduct(productId:number){
    return this.http.delete(`${this.BASE_URL}/delete/`+productId);
  }



}
