import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../Models/ilogin';
import { Iuser } from '../Models/iuser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLogged: BehaviorSubject<boolean>;
  baseUrl = environment.BaseAPIURL;
  private currentUserSource = new ReplaySubject<Iuser>(1);
  
  currentUser$ = this.currentUserSource.asObservable();
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  private httpOptions;
  constructor(private http: HttpClient) {
    this.IsLogged = new BehaviorSubject<boolean>(false);

    this.httpOptions = {

      headers: new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${localStorage.getItem("token")}`

      })

    }
  }

  // Login(userLogin: ILogin) {
  //   return this.httpClient.post<TokenResult>(`${environment.BaseAPIURL}/Auth/Token`, JSON.stringify(userLogin), this.httpOptions);
  // }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Auth/Login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.currentUser$ = user.user;
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
       

        }
      })
    )
  }

  // Logout() {
  //   localStorage.removeItem("token");
  //   this.IsLogged.next(false);
  // }

  // Register(newUserRegister: Iuser): Observable<Iuser> {
  //   console.log("in service" + newUserRegister);
  //   return this.http.post<Iuser>(`${environment.BaseAPIURL}/Auth/register`, JSON.stringify(newUserRegister), this.httpOptions);
  // }

  // get IsUserLogged(): boolean {
  //   return localStorage.getItem("token") ? true : false;
  // }


  register(user: Iuser) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {

    let token: any;
    token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach((element: string) => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
  

}
