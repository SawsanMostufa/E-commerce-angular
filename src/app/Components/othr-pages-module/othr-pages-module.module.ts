import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductDetalisComponent } from './product-detalis/product-detalis.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DiscountSectionComponent } from './discount-section/discount-section.component';

const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'products/:pid',component:ProductDetalisComponent},
  {path:'cart',component:CartComponent},
  {path:'payment',component:PaymentComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
]

@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
    ProductDetalisComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    DiscountSectionComponent,

    
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OthrPagesModuleModule { }
