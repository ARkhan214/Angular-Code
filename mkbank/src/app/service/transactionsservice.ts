import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Accountsservice } from './accountsservice';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {
  private baseUrl:string = "http://localhost:3000/transactions"

  constructor(
    private http:HttpClient,
     private accountService: Accountsservice   //chat gpt
  ) { }

  logTransaction(txn: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, txn);
  }
   saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }


  deleteTransaction(id: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/${id}`);
}


  
  // limon bhi er code modifi

  // private baseTransferUrl = 'http://localhost:3000/fundTransfers';
  // private baseAccountUrl = 'http://localhost:3000/accounts';

  // constructor(private http: HttpClient) {}

  // submitFundTransfer(transferData: any): Observable<any> {
  //   return this.http.post(this.baseTransferUrl, transferData);
  // }

  // getAccountByNumber(accountNumber: string): Observable<any> {
  //   return this.http.get<any[]>(this.baseAccountUrl).pipe(
  //     map(accounts => accounts.find(acc => acc.accountNumber === accountNumber))
  //   );
  // }

  // downloadTransferReceipt(): Observable<Blob> {
  //   const fakePdfUrl = 'assets/sample-receipt.pdf';
  //   return this.http.get(fakePdfUrl, { responseType: 'blob' });
  // }


}
