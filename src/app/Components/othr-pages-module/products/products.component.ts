import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { ICart } from 'src/app/ViewModels/icart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  ProductName:any;
  CategoryList:ICategory[]=[];
  FileredProducts:IProduct[]=[];
  ProductList:IProduct[]=[];
  CartItems:ICart[]=[];
  constructor(private categoryService:CategoryService,private productService:ProductService) {
    
   }
  Filter(id:number)
  {
  
    if(id==0)
    {
      this.FileredProducts=this.ProductList;
    }
    else
    {

      this.FileredProducts= this.ProductList.filter(el=>el.categoryId==id);
  console.log(this.FileredProducts)

    }
  
  
  }
  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(all=>{
      this.CategoryList=all;
    });
    this.productService.GetAllProducts().subscribe(allProducts=>{
      this.ProductList=allProducts;
      console.log(this.ProductList);
      this.FileredProducts=this.ProductList;

    })

  }

 


}
