import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Accountsservice {


  private apiUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) { }


  depositToAccount(id: string, amount: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    map(account => {
      account.balance += amount;
      return account;
    }),
    switchMap(updatedAccount => {
      return this.http.put(`${this.apiUrl}/${id}`, updatedAccount); 
    })
  );
}


  addAccount(account: Accounts): Observable<Accounts> {
    return this.http.post<Accounts>(this.apiUrl, account);
  }

  getAccountsByUserId(userId: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(`${this.apiUrl}?userId=${userId}`);
  }

  //last update Accounts[]

  getAllAccount(): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(this.apiUrl);
  }


  updateAccount(id: string, account: Accounts): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, account);
  }
  
  deleteAccount(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  // depositToAccount(id: string, amount: number): Observable<any> {
  //   const url = `http://localhost:3000/accounts/${id}`;
  //   return this.http.get<any>(url).pipe(
  //     switchMap(account => {
  //       account.balance += amount;
  //       return this.http.put(url, account);
  //     })
  //   );
  // }



}
