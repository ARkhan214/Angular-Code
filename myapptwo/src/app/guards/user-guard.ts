import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ChangeDetectorRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class UserGurd implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router,
    // private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformid: object

  ){}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {

   if(this.authService.isAuthenticated() && this.authService.isUser()){
    return true;
   }
   else{
    // this.cdr.reattach();
    return  this.router.createUrlTree(['login']);
   }
  }
}
;
