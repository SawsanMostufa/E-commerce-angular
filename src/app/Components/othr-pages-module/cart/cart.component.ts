import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SharedPoductDataService } from 'src/app/Services/shared-poduct-data.service';
import { ICart } from 'src/app/ViewModels/icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,OnChanges {
  cartItems:ICart[]=[];
  ProductShosen!:IProduct;
  ShoppingCardItems:ICart[]=[];
  productQuantity!:number
  Total:number=0;
  itemsCount!:number;
  constructor(private cartService:CartService) { 

  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
   
  this.cartItems=JSON.parse(localStorage.getItem('cartItem')!)
 this. LoadCart();

 console.log('====================================');
 console.log(this.cartItems.length);
 console.log('====================================');

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
  LoadCart()
  {
    if(localStorage.getItem('cartItem'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cartItem')!)
    this.Total=  this.cartItems.reduce(function(acc,product)
      {
return acc +(product.prouductPrice * product.SelectedQuantity)
      },0)
    }
  }
  inc(id:number,quantity:number)
  {
for (let i = 0; i < this.cartItems.length; i++) {
if(this.cartItems[i].ProductID===id)
{
  this.cartItems[i].SelectedQuantity=quantity +1;
}  
this.Total=this.Total +this.cartItems[i].prouductPrice;
localStorage.setItem('cartItem',JSON.stringify(this.cartItems));
this.LoadCart();
}
  }
  dec(id:number,quantity:number)
  {
for (let i = 0; i < this.cartItems.length; i++) {
if(this.cartItems[i].ProductID===id)
{if(quantity >1)
  this.cartItems[i].SelectedQuantity=quantity -1;
}  
localStorage.setItem('cartItem',JSON.stringify(this.cartItems));
this.LoadCart();
}
  }
  RemoveAllFromCard()
  {

    localStorage.removeItem('cartItem')
    this.cartItems=[];
    this.itemsCount=0;
    this.cartService.countCartItems.next(this.itemsCount);

  }
  RemoveFromCard(id:number)
  {
    if(localStorage.getItem('cartItem'))
    {
      this.cartItems=JSON.parse(localStorage.getItem('cartItem')!)
      for (let i = 0; i < this.cartItems.length; i++) {
        if(this.cartItems[i].ProductID===id)
        {
          this.cartItems.splice(i,1);
          localStorage.setItem('cartItem',JSON.stringify(this.cartItems));
          this.LoadCart();
          this.Count();

        }
      }
    }
   
  
  }  

}
