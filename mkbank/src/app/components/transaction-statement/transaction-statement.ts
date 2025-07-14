import { ChangeDetectorRef, Component } from '@angular/core';
import { Transaction } from '../../model/transactions.model';
import { Transactionsservice } from '../../service/transactionsservice';
import { Accounts } from '../../model/accounts.model';
import { Accountsservice } from '../../service/accountsservice';

declare var html2pdf: any;


@Component({
  selector: 'app-transaction-statement',
  standalone: false,
  templateUrl: './transaction-statement.html',
  styleUrl: './transaction-statement.css'
})
export class TransactionStatement {

   accountId: string = '';
  transactions: Transaction[] = [];
  // accountInfo: Accounts[] = [];    //new add
  errorMessage: string = '';
  loading = false;

  //for sender and resiver name
  // senderNames: { [id: string]: string } = {};
  // receiverNames: { [id: string]: string } = {};

  constructor(
    private transactionService: Transactionsservice,
    //  private accountService: Accountsservice,  //for sender and resiver name
    private cd: ChangeDetectorRef
  ) {}

  findStatement(): void {
    if (!this.accountId.trim()) {
      this.errorMessage = 'Please enter an Account ID.';
      this.transactions = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.transactions = [];

    this.transactionService.getTransactionsByAccountId(this.accountId).subscribe({
      next: (result) => {


        //for sender and resiver name
        
      //   this.transactions = result;
      //   // Fetch sender & receiver names per transaction
      // for (let tx of this.transactions) {
      //   // Sender Name
      //   this.accountService.getAccountsByUserId(tx.accountId).subscribe(accList => {
      //     this.senderNames[tx.id!] = accList[0]?.userName || 'Unknown';
      //     this.cd.detectChanges();
      //   });

      //   // Receiver Name (only for Transfer)
      //   if (tx.receiverAccountId) {
      //     this.accountService.getAccountsByUserId(tx.receiverAccountId).subscribe(accList => {
      //       this.receiverNames[tx.id!] = accList[0]?.userName || 'Unknown';
      //       this.cd.detectChanges();
      //     });
      //   }
      // }


        this.loading = false;
        if (result.length === 0) {
          this.errorMessage = 'No transactions found for this Account ID.';
        } else {
          this.transactions = result;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Error fetching statement.';
      }
    });
  }

  printStatement(): void {
    const element = document.getElementById('statementTable');
    const opt = {
      margin: 0.5,
      filename: `account-statement-${this.accountId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (element) {
      html2pdf().set(opt).from(element).save();
    } else {
      alert('Nothing to print!');
    }
  }

}
