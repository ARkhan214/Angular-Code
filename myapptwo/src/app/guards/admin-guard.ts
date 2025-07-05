import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

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
