import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmitLogin() {
    this.userService.getAllUser().subscribe(users => {
      const foundUser = users.find((u: User) =>
        u.email === this.email && u.password === this.password
      );

      if (foundUser) {
        // ✅ লোকালস্টোরেজে ইউজার সেট করলাম
        localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

        // ✅ ইউজারের ধরন অনুযায়ী প্রোফাইলে রাউটিং
        if (foundUser.type === 'admin') {
          this.router.navigate(['/admin-profile']);
        } else {
          this.router.navigate(['/user-profile']);
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
