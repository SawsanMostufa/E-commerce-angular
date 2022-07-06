import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { LoginComponent } from './Components/othr-pages-module/login/login.component';
import { PaymentComponent } from './Components/othr-pages-module/payment/payment.component';
import { RegisterComponent } from './Components/othr-pages-module/register/register.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component:HomeComponent },
      { path: 'ContactUs', component: ContactUsComponent },
    
      {
        path: 'otherPages',
        loadChildren: () => import('src/app/Components/othr-pages-module/othr-pages-module.module').then(m => m.OthrPagesModuleModule)
      },

    ]
  },
  {
    path: 'other',
    loadChildren: () => import('src/app/Components/othr-pages-module/othr-pages-module.module').then(m => m.OthrPagesModuleModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
