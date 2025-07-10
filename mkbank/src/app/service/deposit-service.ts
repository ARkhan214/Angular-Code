import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposit } from '../model/deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
private baseUrl: string="http://localhost:3000/deposit"


  constructor(private http: HttpClient) { }

  saveDeposit(deposit: Deposit): Observable<any>{
   return this.http.post(this.baseUrl, deposit);
  }

}
