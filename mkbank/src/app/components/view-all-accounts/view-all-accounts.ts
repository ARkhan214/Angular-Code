import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accountsservice } from '../../service/accountsservice';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Accounts } from '../../model/accounts.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-view-all-accounts',
  standalone: false,
  templateUrl: './view-all-accounts.html',
  styleUrl: './view-all-accounts.css'
})
export class ViewAllAccounts implements OnInit {

account:any;
// username:any;

   constructor(
    private accounService: Accountsservice,
    private userService:UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
   this.loadData();
  }

loadData(): void {
    this.account = this.accounService.getAllAccount();
    // this.username = this.userService.getAllUser();
    this.cdr.markForCheck();
  }

//last update

//  loadData(): void {
//       this.account =this.accounService.getAllAccount().subscribe(accounts => {
//       const updatedAccounts: Accounts[] = [];
//       accounts.forEach(acc => {
//         this.userService.getUserById(acc.userId).subscribe(user => {
//           acc.userName = user.name;
//           updatedAccounts.push(acc);
//           this.account = [...updatedAccounts];
//           this.cdr.markForCheck();
//         });
//       });
//     });
//   }


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



 // new method for close part
  closeAccount(id: string): void {
    this.accounService.closeAccount(id).subscribe({
      next: () => {
        this.loadData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error closing account:', err);
      }
    });
  }


  // new method for open part
  openAccount(id: string): void {
  this.accounService.openAccount(id).subscribe({
    next: () => {
      this.loadData();
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.log('Error opening account:', err);
    }
  });
}



}
