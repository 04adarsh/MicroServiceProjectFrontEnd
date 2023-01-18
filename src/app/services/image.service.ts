import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }
private BASE_URL="http://localhost:9091"

  uploadImages(images:FormData){
    return this.http.post(`${this.BASE_URL}/upload-file`,images);
  }

  uploadMultipleImages(multiImages:FormData){
    return this.http.post(`${this.BASE_URL}/upload-files`,multiImages);
  }

  delteImage(imageName:string){
    return this.http.delete(`${this.BASE_URL}/deleteImage/`+imageName);
  }
}
