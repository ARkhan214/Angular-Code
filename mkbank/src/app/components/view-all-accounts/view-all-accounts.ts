import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accountsservice } from '../../service/accountsservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-accounts',
  standalone: false,
  templateUrl: './view-all-accounts.html',
  styleUrl: './view-all-accounts.css'
})
export class ViewAllAccounts implements OnInit {

account:any;

   constructor(
    private accounService: Accountsservice,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.loadData();
  }

loadData(): void {
    this.account = this.accounService.getAllAccount();
    this.cdr.markForCheck();
  }

   deleteAccount(id: string): void {
    this.accounService.deleteAccount(id).subscribe({
      next: () => {
        console.log('Account deleted');
        this.loadData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error deleting User: ', err);
      }

    })

  }

}
