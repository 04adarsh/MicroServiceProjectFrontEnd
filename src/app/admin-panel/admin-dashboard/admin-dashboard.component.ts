import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/models/file-handle.model';
import { ImageService } from 'src/app/services/image.service';
import { TestingService } from 'src/app/services/testing.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {


 images:FileHandle[]=[];
 image!:FileHandle;


 test={
  imageName:""
 }


 



 
 

 constructor(private imageService:ImageService,private sanitizer:DomSanitizer,private testSer:TestingService){}
// uploadImages(){
//   const imageFormData=this.prepareFormData();
//   this.imageService.uploadImages(imageFormData).subscribe((res:any)=>{
//     console.log(res)
//     console.log(res)
//   },err=>{
//     console.log(err);
//   })

  
//  }

//  uploadMultipleImages(){
//   const formDatamulti=this.prepareFormData();
//   this.imageService.uploadMultipleImages(formDatamulti).subscribe((res:any)=>{
//     console.log(res);
//   },err=>{
//     console.log(err);
//   })

//  }


//  testJson(){
//   let imageName={"imageList":["str","str1"]};
//   let str=JSON.stringify(imageName);
//   console.log(str);
//   this.test.imageName=str;
 
//   this.testSer.test(this.test).subscribe((res:any)=>{
//     console.log(res);
//   },err=>{
//     console.log(err)
//   })


//   }

//  }

//  onFileSelected(event: any) {
//   console.log(event);
//   if (event.target.files) {
//     const file = event.target.files[0];

//     const fileHandle: FileHandle = {
//       file: file,
//       url: this.sanitizer.bypassSecurityTrustUrl(
//         window.URL.createObjectURL(file)
//       )
//     }
//     this.image = fileHandle;
//   }

// }

// onFilesSelected(event:any){
//   console.log(event);
//   if (event.target.files) {

//     for(var i=0;i<event.target.files.length;i++){
//       const file = event.target.files[i];

//       const fileHandle: FileHandle = {
//         file: file,
//         url: this.sanitizer.bypassSecurityTrustUrl(
//           window.URL.createObjectURL(file)
//         )
//       }
//       this.images.push(fileHandle);
//     }
//     }
      
// }

// prepareFormData(): FormData {
//   const formData: FormData = new FormData();


//  for(var i=0;i<this.images.length;i++){
//   formData.append(
//     "files",
//     this.images[i].file,
//     this.images[i].file.name
//   )
//  }

   
//   return formData;
// }

  



}