import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, take, tap} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(estado => {
          if (!estado) {
            this.router.navigate(['/login']);
          }
        })
      );

  }

  canLoad(): Observable<boolean >  {
    return this.authService.isAuth()
      .pipe(
        tap(estado => {
          if (!estado) {
            this.router.navigate(['/login']);
          }
        }),
        take(1)
      );
  }


}