import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts.model';
import { map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Accountsservice {


  private apiUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) { }

// new method for close part
  depositToAccount(id: string, amount: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      if (account.status === 'Closed') {
        return throwError(() => new Error('This account is closed and cannot accept deposits.'));
      }
      account.balance += amount;
      return this.http.put<Accounts>(url, account);
    })
  );
}
  
//deposit main method

  // depositToAccount(id: string, amount: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Accounts>(url).pipe(
  //     map(account => {
  //       let newBalance = account.balance + amount;
  //       account.balance = newBalance;
  //       return account;
  //     }),
  //     switchMap(updatedAccount => {
  //       return this.http.put(`${this.apiUrl}/${id}`, updatedAccount);
  //     })
  //   );
  // }

// new method for close part

  withdrawFromAccount(id: string, amount: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      if (account.status === 'Closed') {
        return throwError(() => new Error('This account is closed and cannot withdraw money.'));
      }
      if (account.balance < amount) {
        return throwError(() => new Error('Insufficient balance'));
      }
      account.balance -= amount;
      return this.http.put<Accounts>(url, account);
    })
  );
}




//withdraw main method

//   withdrawFromAccount(id: string, amount: number): Observable<any> { 

//   const url = `${this.apiUrl}/${id}`;
//   return this.http.get<Accounts>(url).pipe(
//     switchMap(account => {
//       if (account.balance < amount) {
//         return throwError(() => new Error('Insufficient balance'));
//       }
//       account.balance -= amount;
//       return this.http.put<Accounts>(url, account);
//     })
//   );
// }


// new method for close part
  closeAccount(id: string): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      account.status = 'Closed';
      return this.http.put(url, account);
    })
  );
}

// 🟢 Reactivate or Open account
openAccount(id: string): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      account.status = 'Active';  // ✅ status change
      return this.http.put(url, account);
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
