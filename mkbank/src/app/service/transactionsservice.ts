import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {
  private baseUrl:string = "http://localhost:3000/transactions";

  constructor(
    private http:HttpClient
  ) { }

   saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }



}
