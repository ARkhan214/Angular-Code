import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { Accountsservice } from './accountsservice';
import { Accounts } from '../model/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {


  private accountsUrl = 'http://localhost:3000/accounts'; // JSON server URL
  private transactionsUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  addTransactionWithBalance(transaction: Transaction): Observable<any> {
    const accountId = transaction.accountId;

    return this.http.get<Accounts>(`${this.accountsUrl}/${accountId}`).pipe(
      switchMap(account => {
        if (!account) {
          return throwError(() => new Error('Account not found!'));
        }

        let newBalance = account.balance || 0;

        if (transaction.type === 'Deposit') {
          newBalance += transaction.amount;
        } else if (transaction.type === 'Withdraw') {
          if (transaction.amount > newBalance) {
            return throwError(() => new Error('Insufficient balance!'));
          }
          newBalance -= transaction.amount;
        }

        else if (transaction.type === 'Transfer') {
          if (transaction.amount > newBalance) {
            return throwError(() => new Error('Insufficient balance!'));
          }

          // Sender balance minus
          newBalance -= transaction.amount;

          // Find Receiver account and incarage balance
          const receiverId = transaction.receiverAccountId;

          this.http.get<Accounts>(`${this.accountsUrl}/${receiverId}`).subscribe(receiverAccount => {
            const updatedReceiver = {
              ...receiverAccount,
              balance: receiverAccount.balance + transaction.amount
            };

            // update Receiver- balance
            this.http.put(`${this.accountsUrl}/${receiverId}`, updatedReceiver).subscribe({
              next: () => {
                console.log('Receiver balance updated!');
              },
              error: err => {
                console.error('Receiver update failed:', err);
              }
            });
          }, error => {
            console.error('Receiver not found:', error);
          });
        }





        // Update account balance
        const updatedAccount: Accounts = { ...account, balance: newBalance };

        return this.http.put<Accounts>(`${this.accountsUrl}/${accountId}`, updatedAccount).pipe(
          switchMap(() => {
            return this.http.post<Transaction>(this.transactionsUrl, transaction);
          })
        );
      })
    );
  }




  getTransactionsByAccountId(accountId: string): Observable<Transaction[]> {
    // JSON server supports ?accountId=XYZ
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Transaction[]>(this.transactionsUrl, { params });
  }




  //transfer
  addTransferTransaction(transaction: Transaction): Observable<any> {
    const senderId = transaction.accountId;
    const receiverId = transaction.receiverAccountId;

    if (!receiverId) {
      return throwError(() => new Error('Receiver account ID is missing!'));
    }

    return this.http.get<Accounts>(`${this.accountsUrl}/${senderId}`).pipe(
      switchMap(senderAccount => {
        if (!senderAccount) {
          return throwError(() => new Error('Sender account not found!'));
        }

        if (transaction.amount > senderAccount.balance) {
          return throwError(() => new Error('Insufficient balance!'));
        }

        return this.http.get<Accounts>(`${this.accountsUrl}/${receiverId}`).pipe(
          switchMap(receiverAccount => {
            if (!receiverAccount) {
              return throwError(() => new Error('Receiver account not found!'));
            }

            const updatedSender: Accounts = {
              ...senderAccount,
              balance: senderAccount.balance - transaction.amount
            };

            const updatedReceiver: Accounts = {
              ...receiverAccount,
              balance: receiverAccount.balance + transaction.amount
            };

            return forkJoin([
              this.http.put<Accounts>(`${this.accountsUrl}/${senderId}`, updatedSender),
              this.http.put<Accounts>(`${this.accountsUrl}/${receiverId}`, updatedReceiver)
            ]).pipe(
              switchMap(() => this.http.post<Transaction>(this.transactionsUrl, transaction))
            );
          })
        );
      })
    );
  }



  //   private baseUrl:string = "http://localhost:3000/transactions"

  //   constructor(
  //     private http:HttpClient,
  //      private accountService: Accountsservice   //chat gpt
  //   ) { }

  //   logTransaction(txn: Transaction): Observable<Transaction> {
  //     return this.http.post<Transaction>(this.baseUrl, txn);
  //   }
  //    saveTransaction(transaction: Transaction): Observable<Transaction[]> {
  //     return this.http.post<Transaction[]>(this.baseUrl, transaction);
  //   }

  // //   saveTransaction(transaction: Transaction): Observable<Transaction> {
  // //   const { id, ...rest } = transaction; // remove id if exists
  // //   return this.http.post<Transaction>(this.baseUrl, rest);
  // // }


  //   getAllTransactions(): Observable<Transaction[]> {
  //     return this.http.get<Transaction[]>(this.baseUrl);
  //   }

  //   getTransactionById(id: string): Observable<Transaction> {
  //     return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  //   }


  //   deleteTransaction(id: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }



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
