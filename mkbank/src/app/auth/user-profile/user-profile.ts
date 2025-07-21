import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {
  user!: User;
  account!: Accounts;

  constructor(private accountService: Accountsservice) {}

  ngOnInit(): void {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);

      // find user account
      this.accountService.getAccountsByUserId(this.user.id!).subscribe(accs => {
        if (accs.length > 0) {
          this.account = accs[0]; // soupose one account for one user
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }
}
