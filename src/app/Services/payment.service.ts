import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Iuser } from '../Models/iuser';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { 
   
  } 
 enroll(order:any):Observable<Iuser>

  {
    return this.http.post<Iuser>(`${environment.BaseAPIURL}/Order`, JSON.stringify(order));
  }
}


