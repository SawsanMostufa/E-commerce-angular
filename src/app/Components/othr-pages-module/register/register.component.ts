import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iuser } from 'src/app/Models/iuser';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegisterForm ! :FormGroup;

  constructor(private formBuilder:FormBuilder,

              private userApi:AuthService) {

    this.userRegisterForm = formBuilder.group({
      firstName:['',[Validators.required,Validators.email]],
      lastName:['',[Validators.required,Validators.email]],


      userName:['',[Validators.required,Validators.minLength(5)]],

      email:['',[Validators.required,Validators.email]],

      password:['',[Validators.required,Validators.email]],
      confirm:['',[Validators.required,Validators.email]],

    })}


    get firstName()

    {
  
      return this.userRegisterForm.controls['firstName'];
  
    }
    get lastName()

    {
  
      return this.userRegisterForm.controls['lastName'];
  
    }
    get userName()

  {

    return this.userRegisterForm.controls['userName'];

  }

  get email()

  {

    return this.userRegisterForm.controls['email'];

  }

  get password()

  {

    return this.userRegisterForm.controls['password'];

  }

  get confirm() {

    return this.userRegisterForm.controls['confirm'];

  }

  RegisterNew()

  {

    console.log(this.userRegisterForm.value);

    this.userApi.Register(this.userRegisterForm.value).subscribe()

  }
  ngOnInit(): void {
  }
}