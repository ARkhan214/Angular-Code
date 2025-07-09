import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Accountsservice {


  private apiUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  addAccount(account: Accounts): Observable<Accounts> {
    return this.http.post<Accounts>(this.apiUrl, account);
  }

  getAccountsByUserId(userId: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(`${this.apiUrl}?userId=${userId}`);
  }

    getAllAccount(): Observable<Accounts>{
    return this.http.get<Accounts>(this.apiUrl);
  }

  deleteAccount(id:string): Observable<any>{
return this.http.delete(this.apiUrl+'/'+id);
}
  
}
