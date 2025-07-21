import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  user!: User;


  account !: Accounts;
  accId:string='';

  constructor(
    private accountService: Accountsservice,


    private userService:UserService
  ) {}

  ngOnInit(): void {

    // this.loadAccountDetails(this.account.id!);

    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);

      // find user account
      this.accountService.getAccountsByUserId(this.user.id!).subscribe(accs => {
        if (accs.length > 0) {
          this.account= accs[0]; // soupose one account for one user
        }
      });
    }

    
  }


  
  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }



    loadAccountDetails(id:string):void{

    this.accountService.getAllAccountById(id).subscribe({
      next:(acc:Accounts) =>{
      this.account = acc;
      },

    })
  }

  // loadUserProfile(): void {
  //   const sub = this.accountService.getAccountsByUserId(any).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res) {
  //         this.user = res;
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error loading user profile:', err);
  //     }
  //   });

  //   this.subscription.add(sub);
  // }



}
