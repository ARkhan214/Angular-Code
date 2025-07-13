import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';

@Component({
  selector: 'app-addtransaction',
  standalone: false,
  templateUrl: './addtransaction.html',
  styleUrl: './addtransaction.css'
})
export class Addtransaction {

  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionsservice
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],  // ✅ Add field for manual account entry
      receiverAccountId: [''], // Transfer 
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) 
      return;

    const transaction: Transaction = {
      
      type: this.transactionForm.value.type,
      amount: this.transactionForm.value.amount,
      description: this.transactionForm.value.description,
      transactiontime: new Date(),
      accountId: this.transactionForm.value.accountId, // ✅ Use manual input
      receiverAccountId: this.transactionForm.value.receiverAccountId //Transfer
    };

    this.transactionService.addTransactionWithBalance(transaction).subscribe({
      next: () => {
        alert('Transaction added & balance updated!');
        this.transactionForm.reset();
      },
      error: (err) => {
        alert('Error: ' + err.message);
      }
    });
  }
}
