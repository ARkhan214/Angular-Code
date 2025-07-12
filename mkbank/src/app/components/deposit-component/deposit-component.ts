import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accountsservice } from '../../service/accountsservice';
import { DepositService } from '../../service/deposit-service';
import { error } from 'console';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';

@Component({
  selector: 'app-deposit-component',
  standalone: false,
  templateUrl: './deposit-component.html',
  styleUrl: './deposit-component.css'
})
export class DepositComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private accountService: Accountsservice,
    private depositService: DepositService,
    private transactionService:Transactionsservice,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      accountId: [''],
      accountName: [''],
      amount: [''],
      transactionDate: [new Date()],
      chequeNumber: [''],
      depositDate: [''],
      transactionId: [''],
      description: ['']
    });

  }

  deposit(): void {
    const accountId = this.formGroup.value.accountId;
    const amount = +this.formGroup.value.amount;
    const accountName = this.formGroup.value.accountName;  //last update for show name in transaction table

    this.accountService.depositToAccount(accountId, amount).subscribe({
      next: (res) => {
        console.log("Deposit Done");

          //  Transaction log 
        const txn: Transaction = {
          id: '',
          accountId: accountId,

          accountName:accountName,  //last update for show name in transaction table

          type: 'Deposit',
          amount: amount,
          transactiontime: new Date()
        };

        this.transactionService.logTransaction(txn).subscribe({
          next: () => {
            console.log('Transaction logged successfully.');
          },
          error: () => {
            console.error('Transaction logging failed.');
          }
        });

        this.formGroup.reset();
      },
      error: (error) => {
        console.log("Deposit Failed");
      }
    })
  }





}
