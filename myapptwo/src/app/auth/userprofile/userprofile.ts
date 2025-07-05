import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { Userservice } from '../../service/userservice';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile {

  user: User | null = null;
  private subscription: Subscription = new Subscription();

constructor(
    private authService: AuthService, // ✅ fixed spelling
    private router: Router,
    private userSer: Userservice
  ) { }

  ngOnInit(): void {
   this.loadUserProfile();
  }

  loadUserProfile(): void {
    const sub = this.userSer.getUserProfile().subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.user = res;
        }
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
