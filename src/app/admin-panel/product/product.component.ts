import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

import { FileHandle } from 'src/app/models/file-handle.model';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from '../../services/product.service';

export class Product{

    productId!:number
    productName!:string
    productDescription!: string
    productImages!:string
    categoryName!: string
    quantity!:number



}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  images:FileHandle[]=[];
  product= {
  
    productName: "",
    productDescription: "",
    productImages:"",
    categoryName: "",
    quantity: 0

  }

  productImage!:FileHandle;

  productId!: number;
  allProducts:any
  formData!: FormGroup;


  showAdd!: boolean;
  showUpdate!: boolean;

  categories: any;

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
    private toastr: ToastrService, private categoryService: CategoryService, 
    private sanitizer: DomSanitizer,private imageService:ImageService) {

  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      productName: ['',Validators.required ],
      productDescription: ['',Validators.required],
      categoryName: ['',Validators.required ],
      quantity: ['',Validators.required ]

    })
     this.getAllCategories();
     this.getAllProduct();
     console.log(this.allProducts)


  }

  onAdd() {
    this.showAdd = true;
    this.showUpdate = false;
  }

  // addProduct() {
  //   this.product=this.formData.value;
  //   const imageFormData=this.prepareFormData();
  //   this.imageService.uploadImages(imageFormData).subscribe(({resposne}:any)=>{
  //     console.log(resposne);
  //     let image_name=resposne;
  //     if(image_name!="" || image_name!=null){
  //       this.product.productImages=image_name;
  //       this.productService.createProduct(this.product).subscribe((res:any)=>{
  //         console.log(res);
  //         this.toastr.success("success","product created successfully");
  //         document.getElementById("closemodal")?.click();
  //         this.getAllProduct();
  //         this.formData.reset();
        
  //       },err=>{
  //         console.log(err);
  //       })
  //     }
    
  //   })
  
  // }

  addProduct(){
    this.product=this.formData.value;
    const imageFormData=this.prepareFormData();
    this.imageService.uploadMultipleImages(imageFormData).subscribe((res:any)=>{
      console.log(res)
      let list=[];
      list=res;
      let image_name=list.toString();
      if(image_name!="" || image_name!=null){
        this.product.productImages=image_name;
        this.productService.createProduct(this.product).subscribe((res:any)=>{
          console.log(res);
          this.toastr.success("success","product created successfully");
          document.getElementById("closemodal")?.click();
          this.getAllProduct();
          this.formData.reset();
        
        },err=>{
          console.log(err);
        })
      }
    
    })

  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe((res:any)=>{
    
      this.allProducts=res;

      for(let product of this.allProducts){
        product.imageName="http://localhost:9091/getImages/"+product.imageName;
      }
   
      console.log(this.allProducts);

    },err=>{
      console.log("cannot fetch product list");
    })
  }

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId).subscribe((res:any)=>{
      console.log(res);
      this.toastr.success("Success","product deleted successfully..")
      this.getAllProduct()
    },err=>{
      console.log(err);
    })

  }

  onEdit(product:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.productId=product.productId;
    this.formData.controls['productName'].setValue(product.productName);
    this.formData.controls['productDescription'].setValue(product.productDescription);
    this.formData.controls['categoryName'].setValue(product.category.categoryName);
    this.formData.controls['quantity'].setValue(product.quantity);
  }



  updateProduct(){
    this.product=this.formData.value;
    const imageFormData=this.prepareFormData();
    this.imageService.uploadImages(imageFormData).subscribe((res:any)=>{
      let image_name=res.resp
    })
   this.productService.updateProduct(this.productId,this.product).subscribe((res:any)=>{
    console.log(res);
    this.toastr.success("Success","Product Updated Successfully..")
    document.getElementById("closemodal")?.click();
    this.formData.reset();
    this.getAllProduct();
   },err=>{
    this.toastr.error("something went wrong..")
   })
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe((res:any)=>{
      console.log(res);
      this.categories=res;

    },err=>{
      console.log(err);
    })
  }

  onFileSelected(event: any) {
    console.log(event);
    if (event.target.files) {
      const file = event.target.files[0];
  
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.productImage = fileHandle;
    }
  
  }

  // prepareFormData(): FormData {
  //   const formData: FormData = new FormData();
  
  
  
  //   formData.append(
  //     "file",
  //     this.productImage.file,
  //     this.productImage.file.name
  //   )
  //   return formData;
  // }

  // uploadMultipleImages(){
  //   const formDatamulti=this.prepareFormData();
  //   this.imageService.uploadMultipleImages(formDatamulti).subscribe((res:any)=>{
  //     console.log(res);
  //   },err=>{
  //     console.log(err);
  //   })
  
  //  }
  

  onFilesSelected(event:any){
    console.log(event);
    if (event.target.files) {
  
      for(var i=0;i<event.target.files.length;i++){
        const file = event.target.files[i];
  
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        this.images.push(fileHandle);
      }
      }
      
     
  }
  
  prepareFormData(): FormData {
    const formData: FormData = new FormData();
  
  
   for(var i=0;i<this.images.length;i++){
    formData.append(
      "files",
      this.images[i].file,
      this.images[i].file.name
    )
   }
  
     
    return formData;
  }

}
