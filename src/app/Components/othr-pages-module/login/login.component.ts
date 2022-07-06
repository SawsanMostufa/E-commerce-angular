import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private authService:AuthService,private toast: NgToastService,) {

  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(() => {
      if (this.authService.decodedToken.role == null) {
        this.toast.error('أنت لاتملك صلاحية الدخول', 'غير مصح لك بالدخول');
        localStorage.clear();
        return
      }
      else {

        this.userId = this._accountService.decodedToken.nameid;
        console.log(this._accountService.decodedToken.role);

        this.router.navigate(['/select-location/' + this.userId], {
          skipLocationChange: false
        });

      }
    });
  }
}
