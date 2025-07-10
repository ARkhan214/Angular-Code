import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WithdrawService } from '../../service/withdraw.service';
import { Accountsservice } from '../../service/accountsservice';
import { Withdraw } from '../../model/withdraw.model';

@Component({
  selector: 'app-withdraw-component',
  standalone: false,
  templateUrl: './withdraw-component.html',
  styleUrl: './withdraw-component.css'
})
export class WithdrawComponent implements OnInit {

formGroup !:FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private withdrawService:WithdrawService,
  private accountService:Accountsservice
){}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
       accountId: [''],
      amount: [''],
      transactionDate: [new Date()],
      transactionId: [''],
      description: ['']
    })
  }

  withdraw(): void {
    const withdrawData: Withdraw = this.formGroup.value;

    
    this.accountService.withdrawFromAccount(withdrawData.accountId, withdrawData.amount).subscribe({
      next: () => {
      
        this.withdrawService.saveWithdraw(withdrawData).subscribe({
          next: () => {
            alert('Withdraw Successful');
            this.formGroup.reset();
          },
          error: (err) => {
            console.error('Withdraw save failed:', err);
            alert('Withdraw save failed!');
          }
        });
      },
      error: (err) => {
        console.error('Account withdraw failed:', err);
        alert(err.message || 'Withdraw failed from account');
      }
    });
  }



}
