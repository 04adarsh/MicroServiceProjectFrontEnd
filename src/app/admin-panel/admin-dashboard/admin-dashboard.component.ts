import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/models/file-handle.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {


 images!:FileHandle;

 ngOnInit(){

 }

 
 

 constructor(private imageService:ImageService,private sanitizer:DomSanitizer){}

 uploadImages(){
  debugger
  const imageFormData=this.prepareFormData();
  console.log(imageFormData);
  this.imageService.uploadImages(imageFormData).subscribe((res:any)=>{
    console.log(res);
  },err=>{
    console.log(err);
  })
 }


 onFileSelected(event: any) {
  debugger
    const file = event.target.files[0];

    const fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
    this.images=fileHandle;
    console.log(this.images.file);
    console.log(this.images.file.name);
    this.prepareFormData();
  
}

prepareFormData(): FormData {
  const formData: FormData = new FormData();
debugger

  // for(var i=0;i<this.images.length;i++){
 
  
  // }

     formData.append(
      'file',
     this.images.file,
     this.images.file.name,
    
    );

      console.log(formData);
  return formData;
}
  

}

