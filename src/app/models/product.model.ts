import { FileHandle } from "./file-handle.model";

export interface Product{
    productName:string
    productDescription:string
    categoryName:string
    productImage:FileHandle[]
    quantity:number

}