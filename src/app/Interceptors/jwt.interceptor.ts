import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Iuser } from "../Models/iuser";



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  currentUser!: Iuser;
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  

    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
    }
    return next.handle(request);
  }
}
