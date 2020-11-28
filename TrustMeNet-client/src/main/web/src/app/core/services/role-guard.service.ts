import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate, ActivatedRouteSnapshot,
} from '@angular/router';
import {SecurityService} from "./security.service";


@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public securityService: SecurityService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property

    const LIMIT = 3;
    const REGEX = ", ";

    const expectedRole = route.data.expectedRole.split(REGEX, LIMIT);

    if (!this.securityService.isAuthenticated()) {
      this.router.navigate(['login']).then(_ => _);
      return false;
    }

    for (let i = 0; i < expectedRole.length; i++) {
      if (this.securityService.getCurrentRole() == expectedRole[i]) {
        return true;
      }
    }
    this.router.navigate(['login']).then(_ => _);
    return false;
  }
}
