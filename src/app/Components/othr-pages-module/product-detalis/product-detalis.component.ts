import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { SharedPoductDataService } from 'src/app/Services/shared-poduct-data.service';
import { ICart } from 'src/app/ViewModels/icart';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.scss']
})
export class ProductDetalisComponent implements OnInit {
  CartItem!:ICart;
  itemsCount!:number;
  CartItems:ICart[]=[];
  alert:boolean=false;
  private ProductID:number=0;
  product?:IProduct;
  ProductIDsList:number[]=[];
  AllProducts:IProduct[]=[];
  productQuantity:number=1;
  productAddedToCart:ICart[]=[];
    constructor(private activateRoute:ActivatedRoute, private productService:ProductService,
      private cartService:CartService , private openDialog:MatDialog) { 
     this.productService.getPrdIDsList().subscribe(IDs=>
      this.ProductIDsList!=IDs)
  
  
      }
      inc()
      {
    this.productQuantity +=1
    
      }
      dec()
      {
        if(this.productQuantity >=1)
       {
        this.productQuantity -=1
       } 
    
      }
     
    ngOnInit(): void {
      this.activateRoute.paramMap.subscribe(paramMap=>{
        this.ProductID=Number(paramMap.get("pid"));
        this.productService.getProductByID(this.ProductID).subscribe(prod=>this.product=prod)
        console.log(this.ProductID);
      });
      
    }

     addProductToCard(product:IProduct,quantity:number)
  {
   
          if(quantity<=product.quantity)
          {
     
           this.CartItem={
             ProductName:product.name,
             ProductID:product.id,
             SelectedQuantity:quantity,
             prouductPrice:product.price,
             TotalPrice:quantity*product.price,
             Image:product.image,
             Description:product.description,
             Colors:product.colors,
             Sizes:product.sizes
           }
     

         }
          else{
            alert("the amount of this product in our store not enough");
          }
             let LocalStorageData=localStorage.getItem('cartItem')
         if(LocalStorageData==null)
         {
           let LocalStorageDataGet:any=[];
           LocalStorageDataGet.push(this.CartItem);
           localStorage.setItem('cartItem',JSON.stringify(LocalStorageDataGet))
          this.alert=true;
         }
         else
         {
           var id=this.CartItem.ProductID;
           let index:number =-1;
           this.CartItems=JSON.parse(localStorage.getItem('cartItem')!) ;
           for (let i = 0; i < this.CartItems.length; i++) {
             if(id===this.CartItems[i].ProductID)
             {
               this.CartItems[i].SelectedQuantity=this.CartItem.SelectedQuantity;
               index=i;
               break;
             }
             
           }
           if(index ==-1)
           {
             this.CartItems.push(this.CartItem);
             localStorage.setItem('cartItem',JSON.stringify(this.CartItems))
             this.alert=true;
            //  this.openDialog.open(SuccessComponent,{
            //   width : '15%'
            //  });
           }
           else
           {
            localStorage.setItem('cartItem',JSON.stringify(this.CartItems))

           }
         }
          console.log(this.CartItem);
          console.log(LocalStorageData)
         this.Count();
   
  }
  Count()
  {
    if(localStorage.getItem('cartItem')!=null)
    {
      var CartIems=JSON.parse(localStorage.getItem('cartItem')!)
    this.itemsCount=CartIems.length;
    this.cartService.countCartItems.next(this.itemsCount);

    }
  
  }

}
