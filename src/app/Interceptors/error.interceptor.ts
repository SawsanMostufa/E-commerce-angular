import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../Services/AlertFy.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private alertfy: AlertifyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              } else {
                // this.alertfy.error(error.statusText, error.status);
                this.alertfy.error(error.error)
              }
              break;
            case 400:
              this.alertfy.error(error.statusText);
              // this.alertfy.error(error.error,error.statusText)
              break;
            case 401:
              // this.alertfy.error(error.statusText, error.status);
              this.alertfy.error(error.error)
              break;

            case 404:
              this.router.navigateByUrl('/pages/not-found');
              break;

            case 500:
              // this.alertfy.error(error.statusText, error.status);
              this.alertfy.error(error.error)
              break;

            default:
              this.alertfy.error('Something unexpected wrong');
              // console.log(error);
              break;

          }
        }
        return throwError(error);
      })
    )
  }
}
