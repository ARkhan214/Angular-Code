import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accountsservice } from '../../service/accountsservice';
import { DepositService } from '../../service/deposit-service';
import { error } from 'console';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      accountId: [''],
      amount: [''],
      transactionDate: ['']
    });

  }

  deposit(): void {
    const accountId = this.formGroup.value.accountId;
    const amount = this.formGroup.value.amount;
    this.accountService.depositToAccount(accountId, amount).subscribe({
      next: (res) => {
        console.log("Deposit Done");
      },
      error: (error) => {
        console.log("Deposit Failed");
      }
    })
  }





}
