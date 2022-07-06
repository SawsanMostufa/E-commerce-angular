import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICart } from '../ViewModels/icart';

@Injectable({
  providedIn: 'root'
})
export class SharedPoductDataService {
  SharedProductData:BehaviorSubject<ICart[]>
  constructor() { 
   this.SharedProductData=new BehaviorSubject<ICart[]>([]);
   this.SharedProductData.next([])

  }

  addProductToCart(products:any)
  {
    localStorage.setItem("products",JSON.stringify(products));
  }
  getProductFromCart()
  {
    return JSON.parse(localStorage.getItem('products')|| '{}')
  }
  removeAllCartItems()
  {
    return localStorage.removeItem('products');
  }
  
}
