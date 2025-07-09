import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { Accounts } from '../../model/accounts.model';
import { Accountsservice } from '../../service/accountsservice';

@Component({
  selector: 'app-usercomponent',
  standalone: false,
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css'
})
export class Usercomponent implements OnInit {

  userAccountForm !: FormGroup

  constructor(
    private userService: UserService,
    private accountService: Accountsservice,
    private formbuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAccountForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type: ['savings', Validators.required],
      balance: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userAccountForm.valid) {
      const { name, email, password, type, balance } = this.userAccountForm.value;

      const newUser: User = { name, email, password };

      this.userService.saveAllUser(newUser).subscribe(savedUser => {
        const newAccount: Accounts = {
          userId: savedUser.id!,
          type,
          balance: +balance
        };

        this.accountService.addAccount(newAccount).subscribe(savedAccount => {
          console.log('✅ User saved:', savedUser);
          console.log('✅ Account saved:', savedAccount);
          this.userAccountForm.reset();
        });
      });
    }
  }

  loadUserWithAccounts(userId: string) {
    this.userService.getUserById(userId).subscribe(user => {
      this.accountService.getAccountsByUserId(userId).subscribe(accounts => {
        console.log('User:', user);
        console.log('Accounts:', accounts);
      });
    });
  }

}
