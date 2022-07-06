
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../Services/AlertFy.service';
import { AuthService } from '../Services/auth.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, 
                private router: Router,
              private alertfy: AlertifyService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
 
    const roles = next.data['roles'] as Array<string>;;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.alertfy.error('غير مسموح لك بالدخول علي هذا الرابط');
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertfy.error('غير مسموح لك بالدخول لهذا المنطقة');
    this.router.navigate(['/login']);
    return false;
  }
}
