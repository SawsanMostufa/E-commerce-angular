import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  CategoryList:ICategory[]=[];
  FileredProducts:IProduct[]=[];
  ProductList:IProduct[]=[];
  constructor(private categoryService:CategoryService,private productService:ProductService) { }
  Filter(id:number)
  {
  
  this.FileredProducts= this.ProductList.filter(el=>el.categoryId==id);

  
  }
  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(all=>{
      this.CategoryList=all;
    });
    this.productService.GetAllProducts().subscribe(allProducts=>{
      this.ProductList=allProducts;
    })
  }
   
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }



}
