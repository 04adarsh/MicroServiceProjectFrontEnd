import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(private categoryService:CategoryService,private fromBuilder:FormBuilder,private toastr:ToastrService){}


  formData!:FormGroup

  category={
    categoryName:"",
    categoryDescription:""
 }

  categories!:any;
  categoryId!:number

  showAdd!:boolean
  showUpdate!:boolean

  ngOnInit(){

    this.formData=this.fromBuilder.group({
      categoryName:['',Validators.required],
      categoryDescription:['',Validators.required]
    })

    this.getAllCategory();
    
  }

  addCategory(){

    this.category=this.formData.value;
    this.categoryService.createCategory(this.category).subscribe((res:any)=>{
      console.log(res);
      this.toastr.success("Success","category created successfully...")
      document.getElementById("closemodal")?.click();
      this.getAllCategory();
      this.formData.reset();
    },err=>{
      console.log(err)
      this.toastr.error("Error","something went wrong..")
    })

  }

  onEdit(category:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.categoryId=category.categoryId;
    this.formData.controls['categoryName'].setValue(category.categoryName);
    this.formData.controls['categoryDescription'].setValue(category.categoryDescription)

  }

  onAdd(){
    this.showAdd=true;
    this.showUpdate=false;
    this.formData.reset();

  }


  getAllCategory(){
    this.categoryService.getAllCategory().subscribe((res:any)=>{
      console.log(res);
      this.categories=res;
    },err=>{
      console.log(err);
    })

  }

  updateCategory(){
    this.category=this.formData.value;
   this.categoryService.updateCategory(this.categoryId,this.category).subscribe((res:any)=>{
    console.log(res);
    this.toastr.success("success","category updated successfully...")
    document.getElementById("closemodal")?.click();
    this.getAllCategory();
    this.formData.reset();
   },err=>{
    console.log(err);
    this.toastr.error("something went wrong..")
   }) 
  }


  deleteCategory(categoryId:number){
    this.categoryService.deleteCategory(categoryId).subscribe((res)=>{
      console.log(res);
      this.toastr.success("success","category deleted successfully...")
      this.getAllCategory();
    },err=>{
      console.log(err);
    })
  }


}
