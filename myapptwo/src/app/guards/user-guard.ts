import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';

export class UserGurd implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformid: object

  ){}

  canActivate(): boolean {
   if(this.authService.isUser()){
    return true;
   }
   else{
    this.cdr.reattach();
    this.router.navigate(['login']);
    return false;
   }
  }
}
;
