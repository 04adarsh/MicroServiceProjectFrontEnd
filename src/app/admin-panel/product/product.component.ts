import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product={
    productName:"",
    productDescription:"",
    productImageUrl:"",
    categoryName:"",
    quantity:""

  }

  productId!:number;
  allProducts:any;
  formData!:FormGroup;

  showAdd!:boolean;
  showUpdate!:boolean;

  categories:any;

  constructor(private productService:ProductService,private formBuilder:FormBuilder,private toastr:ToastrService,private categoryService:CategoryService){
   
  }

  ngOnInit(){
    this.formData=this.formBuilder.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      productImageUrl:['',Validators.required],
      categoryName:['',Validators.required],
      quantity:['',Validators.required]
    
  })
 this.getAllCategories();
 this.getAllProduct();


}

onAdd(){
  this.showAdd=true;
  this.showUpdate=false;
}

addProduct(){
  this.product=this.formData.value;
  this.productService.createProduct(this.product).subscribe((res:any)=>{
    console.log(res);
    this.toastr.success("Success","product created successfully")
    this.getAllProduct();
    document.getElementById("closemodal")?.click();
    this.formData.reset();

  },err=>{
    this.toastr.error("Error","something went wrong");
  })
}

getAllProduct(){
  this.productService.getAllProduct().subscribe((res:any)=>{
    this.allProducts=res;
   
  },err=>{
    console.log("cannot fetch product list");
  })
}

deleteProduct(productId:number){
  this.productService.deleteProduct(productId).subscribe((res:any)=>{
    console.log(res);
    this.toastr.success("Success","product deleted successfully..")
    this.getAllProduct();
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
  this.formData.controls['productImageUrl'].setValue(product.productImageUrl);
}



updateProduct(){
  this.product=this.formData.value;
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
  }
