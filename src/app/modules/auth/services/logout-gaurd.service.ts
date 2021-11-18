import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserDetailsService } from 'src/app/global-services/user-details.service';

@Injectable()
export class CheckTokenService implements CanActivate {
  constructor(
    private userDetails: UserDetailsService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.userDetails.userToken.pipe(
      take(1),
      map((user) => {
        if (!!!user) {
          return true;
        }
        return this.router.createUrlTree(['/auth/dashboard']);
      })
    );
  }
}
