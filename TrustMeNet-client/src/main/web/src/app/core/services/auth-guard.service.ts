import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SecurityService} from "./security.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public securityService: SecurityService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.securityService.isAuthenticated()) {
      this.router.navigate(['login']).then(_ => _);
      return false;
    }
    return true;

  }
}
