import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileHandle } from 'src/app/models/file-handle.model';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from '../../services/product.service';


export class Product {

  productId!: number
  productName!: string
  productDescription!: string
  productImages: string[] = []
  category: any
  quantity!: number


}

export class UpdatedProduct{

  productName!: string
  productDescription!:string
  productImages!:string
  categoryName!:string
  quantity!:number


}

export class ProductImageObj {
  imageList: string[] = []
  static imageList: any;
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @ViewChild('fileInput', { static: false }) fileInput: any;
  images: FileHandle[] = [];
  product = {

    productName: "",
    productDescription: "",
    productImages: "",
    categoryName: "",
    quantity: 0

  }

  productImage!: FileHandle;
  isDeleteImage = false;

  updatedProduct=new UpdatedProduct();

  onUpdateProduct:any;


  productImagesOnEdit: any;

  productId!: number;
  allProducts: any;
  formData!: FormGroup;
  showImagesOnEdit: any;
  deleteProductImage: any;
  currentProduct: any;
  imageFormData!: FormData;
  onEditProduct:any;

  showAdd!: boolean;
  showUpdate!: boolean;
  prefix = "http://localhost:9091/"

  categories: any;

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
    private toastr: ToastrService, private categoryService: CategoryService,
    private sanitizer: DomSanitizer, private imageService: ImageService) {

  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryName: ['', Validators.required],
      quantity: ['', Validators.required]

    })

    this.getAllCategories();
    this.getAllProduct();




  }

  onAdd() {
    this.formData.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  addProduct() {
    this.product = this.formData.value;
    console.log(this.product)
    this.imageFormData = this.prepareFormData();
    this.imageService.uploadMultipleImages(this.imageFormData).subscribe((res: any) => {
      let arr = res;
      let images = {
        "imageList": arr
      }

      let image_name = JSON.stringify(images);
      console.log(image_name);
      if (image_name != "" || image_name != null) {
        this.product.productImages = image_name;
        this.productService.createProduct(this.product).subscribe((res: any) => {
          console.log(res);
          this.toastr.success("success", "product created successfully");
          this.getAllProduct();
          this.formData.reset();
          this.images = []
          this.imageFormData = new FormData();
          document.getElementById("closemodal")?.click();


          // window.location.reload();

          //  this.fileInput.nativeElement.removeEventListener('change', this.onFilesSelected);
          console.log(this.images);





        }, err => {
          console.log(err);
        })
      }

    }, err => {
      console.log(err);
    })

  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe((res: any) => {
      //     let prefix="http://localhost:9091/getImages/";
      //     for(let i=0;i<res.length;i++){
      //       let product=new Product();
      //       product.productId=res[i].productId;
      //       product.productName=res[i].productName;
      //       product.productDescription=res[i].productDescription;
      //       product.category=res[i].category
      //       product.productImages=res[i].imageName.split(",");
      //       product.quantity=res[i].quantity;



      //       this.allProducts.push(product);
      //     }
      this.allProducts = res;
      // let prefix="http://localhost:9091/getImages/"
      // for(let product of this.allProducts){
      //   for(let j=0;j<product.imageName.imageList.length;j++){
      //     product.imageName.imageList[j]=prefix+product.imageName.imageList[j]
      //   }
      // }


      console.log(this.allProducts);
      // console.log(this.allProducts[0].imageName.imageList)


    }, err => {
      console.log("cannot fetch product list");
    })
  }

  clearFileData() {
    this.fileInput.nativeElement.value = null;
    this.images = [];
    this.imageFormData = new FormData();
    this.currentProduct = null;

  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe((res: any) => {
      console.log(res);
      this.toastr.success("Success", "product deleted successfully..")
      this.getAllProduct()
    }, err => {
      console.log(err);
    })

  }

  onEdit(product: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productId = product.productId;
   this.productService.getProductById(this.productId).subscribe((res:any)=>{
    console.log(res)
   this.onUpdateProduct=res;
    this.formData.value.productName=res.productName;
    this.formData.value.productDescription=res.productDescription;
    this.formData.value.categoryName=res.category.categoryName;
    this.formData.value.quantity=res.quantity;
    console.log(this.formData.value)
    this.product=this.formData.value

    
    
          
   this.formData.controls['productName'].setValue( this.product.productName);
   this.formData.controls['productDescription'].setValue(this.product.productDescription);
   this.formData.controls['categoryName'].setValue(this.product.categoryName);
   this.formData.controls['quantity'].setValue(this.product.quantity);

 

   })


    // console.log(this.showImagesOnEdit)

  }



  updateProduct() {
    this.product = this.formData.value;
    this.imageFormData = this.prepareFormData();
    let productImageObj = new ProductImageObj();
    let image: string;
    // console.log(this.currentProduct);
    let arr: any;
    arr = this.imageFormData.getAll('files');

    this.product=this.formData.value;


    if(JSON.stringify(arr)==="[]"){
     let productImages=JSON.stringify(this.onUpdateProduct.imageName)
     this.product.productImages=productImages;
      this.productService.updateProduct(this.productId,this.product).subscribe(res=>{
        console.log(res)
        this.toastr.success("success","product updated successfully..")
        this.getAllProduct();
        this.formData.reset()
        this.imageFormData = new FormData();
        document.getElementById("closemodal")?.click();
      },err=>{
        console.log(err)
      })
    }else{
      this.imageService.uploadMultipleImages(this.imageFormData).subscribe(res=>{
        console.log(res)
      let resArr:any
      resArr=res;
      console.log(resArr)
      for(let e of resArr){
        this.onUpdateProduct.imageName.imageList.push(e);
      }
      
      let images=JSON.stringify(this.onUpdateProduct.imageName)
      this.product.productImages=images;
      console.log(this.product.productImages)
      console.log(this.product)
      if(this.product.productImages!=="" || this.product.productImages!==null ||this.product.productImages!==undefined){
        this.productService.updateProduct(this.productId,this.product).subscribe(res=>{
          console.log(res)
          this.toastr.success("success","product updated successfully..")
          this.getAllProduct();
          this.formData.reset()
          this.imageFormData = new FormData();
          document.getElementById("closemodal")?.click();
        },err=>{
          console.log(err)
        })
      }
     
      },err=>{
        console.log(err)
      })
    }


    // if (this.deleteProductImage === null || this.deleteProductImage === undefined) {
    //   this.productService.getProductById(this.productId).subscribe((res: any) => {
    //     console.log(res)
    //     this.currentProduct = res;
    //     if (JSON.stringify(arr) !== "[]") {

    //       this.imageService.uploadMultipleImages(this.imageFormData).subscribe((res: any) => {
    //         console.log(res)
    //         let responseArr = res;
    //         for (let i = 0; i < responseArr.length; i++) {
    //           this.currentProduct.imageName.imageList.push(responseArr[i]);
    //           image = JSON.stringify(this.currentProduct.imageName);
    //         console.log(image);
    //         }
    //         this.product.productImages=image;
    //        this.updatedProduct=new UpdatedProduct();
    //        this.updatedProduct.productName=this.product.productName;
    //        this.updatedProduct.productDescription=this.product.productDescription;
    //        this.updatedProduct.categoryName=this.product.categoryName;
    //        this.updatedProduct.productImages=this.product.productImages;
    //        this.updatedProduct.quantity=this.product.quantity;

    //       }, err => {
    //         console.log(err);
    //       })
      
          
    //     } else {
    //     image = JSON.stringify(this.currentProduct.imageName);
    //     console.log(image);
    //     this.product.productImages = image;
    //     }


    //     if (image != "" || image != null) {
    //       if(this.product.productImages!=="" || this.product.productImages!==null || this.product.productImages!==undefined){
    //         this.productService.updateProduct(this.productId, this.updatedProduct).subscribe((res: any) => {
    //           console.log(res);
    //           this.toastr.success("Success", "Product Updated Successfully..")
    //           this.images = []
    //           this.imageFormData = new FormData();
    //           this.formData.reset();
    //           this.deleteProductImage = null;
    //           this.currentProduct = null;
    //           // window.location.reload();
    //           image=""
    //           this.getAllProduct();
    //           document.getElementById("closemodal")?.click();
    //         }, err => {
    //           this.toastr.error("something went wrong..")
    //         })
    //       }

         
    //     }
    //   }, err => {
    //     console.log(err)
    //   })
    // }
  

  }


  getAllCategories() {
    this.categoryService.getAllCategory().subscribe((res: any) => {
      console.log(res);
      this.categories = res;

    }, err => {
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

  onFilesSelected(event: any) {
    console.log(event);
    if (event.target.files) {

      for (let i = 0; i < event.target.files.length; i++) {
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


    for (let i = 0; i < this.images.length; i++) {
      formData.append(
        "files",
        this.images[i].file,
        this.images[i].file.name
      )
    }



    return formData;
  }


  deleteImage(image: any,onUpdateProduct:any) {

    onUpdateProduct.imageName.imageList = this.onUpdateProduct.imageName.imageList.filter((item: any) => item !== image);

    

  }


}

