// auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private ls: LoginService, 
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.ls.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
