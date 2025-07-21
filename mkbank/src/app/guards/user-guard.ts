import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private router: Router


    // private authService: AuthService,
    // @Inject(PLATFORM_ID) private platformid:Object

  ) {}

  canActivate(): boolean {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      const user = JSON.parse(data);
      if (user.type === 'user') {
        console.log(' User access granted');
        return true;
      }
    }

    console.warn(' User access denied');
    this.router.navigate(['/login']);
    return false;
  }

  //  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree>{
  //   if(this.authService.isAuthenticated() && this.authService.isAdmin()){
  //     return true;      
  //   }
  //   return this.router.createUrlTree(['login']);
  // }

}
