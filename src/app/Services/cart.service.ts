import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICart } from '../ViewModels/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {


countCartItems=new BehaviorSubject<number>(0);
  constructor() { }
 
}
