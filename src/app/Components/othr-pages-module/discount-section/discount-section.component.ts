import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-discount-section',
  templateUrl: './discount-section.component.html',
  styleUrls: ['./discount-section.component.scss']
})
export class DiscountSectionComponent implements OnInit {

  ProductName:any;
  FileredProducts:IProduct[]=[];
  ProductList:IProduct[]=[];
  constructor(private productService:ProductService) { }
  Filter()
  {
  
  this.FileredProducts= this.ProductList.filter(el=>el.hasDiscount==true);
  console.log(this.FileredProducts)

  
  }
  ngOnInit(): void {
   
    this.productService.GetAllProducts().subscribe(allProducts=>{
      this.ProductList=allProducts;
      console.log(this.ProductList);
    })
  }

}
