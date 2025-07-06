import { AuthService } from '../service/auth-service';
import { ChangeDetectorRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class AdminGuard implements CanActivate {

constructor(
  private authService:AuthService,
  private router: Router,
  // private cdr:ChangeDetectorRef,
  @Inject(PLATFORM_ID) private platformid:Object

){}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree>{
    if(this.authService.isAuthenticated() && this.authService.isAdmin()){
      return true;      
    }
    return this.router.createUrlTree(['login']);
  }





  // canActivate(): boolean {
  //   if(this.authService.isAdmin()){
  //     return true;      
  //   }
  //   else{
  //     // this.cdr.reattach();
  //     this.router.navigate(['login']);
  //     return false;

  //   }
  // }
  
};
