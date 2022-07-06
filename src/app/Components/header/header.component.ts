import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryService } from 'src/app/Services/category.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@ViewChild('mySidenav') mySidenav! : ElementRef
@ViewChild('flipkartnavbar') flipkartnavbar! : ElementRef
itemsCount:number=0;
CategoryList:ICategory[]=[];
  constructor(private categoryService:CategoryService,private cartService:CartService,
    private popupDialog:MatDialog) {
    this.cartService.countCartItems.subscribe((noOfItems)=>
{
  this.itemsCount=noOfItems; 
})

   }

  

  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe(all=>{
      this.CategoryList=all;
    })

  }
 

  
   openNav() {
   this.mySidenav.nativeElement.style.width = "70%";
    this.flipkartnavbar.nativeElement.style.width = "50%";
    document.body.style.backgroundColor = "rgba(255,255,255,0)";
}

closeNav() {
  this.mySidenav.nativeElement.style.width = "0";
  document.body.style.backgroundColor = "rgba(255,255,255,0)";

}



// catFilter(catId:number){
//   this.prodServ.getProductsByCatID(catId).subscribe( x=>
//     this.produtList = x
//   )
 }
