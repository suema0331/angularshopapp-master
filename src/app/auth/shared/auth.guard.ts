import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor( private authService: AuthService, private router: Router ) {
  }

  // tslint:disable-next-line:typedef
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if(this.authService.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    // else navigate to login
    return false;
  }
}
