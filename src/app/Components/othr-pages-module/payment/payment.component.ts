import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/Models/iproduct';
import { Iuser } from 'src/app/Models/iuser';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  usermodel!:Iuser;
  constructor( private user:PaymentService,private fb:FormBuilder) { }
  
  // usermodel=new user("s","d","as","vv@","ss","12345678905")


  ngOnInit(): void {
  }

  registrationForm = this.fb.group(
    {
      userName:['',Validators.required],
    
      phoneNumber: [''],
      email: [''],
    
    
      address: ['']

    });

    //  templet variable 
    submitData(){
    this.user.enroll(this.usermodel).subscribe(
     res =>{
       console.log("success")
     },
     error =>{
       console.log(error);
     } 
    )
 }

}
