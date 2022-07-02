import { AuthService } from 'src/services/auth.service';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable, take, tap } from 'rxjs';
import { User } from '../models/auth/user';
import { Role } from '../models/auth/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
     private authService: AuthService,
     @Inject("BASE_URL") private baseUrl: string) {  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let role: Role[] = route.data['roles'];
    if (role) {
      console.log('Role[]: ' + route.data['roles']);
      return this.authService.isAuthenticated(role).pipe(tap(isAuth => this.handleAuthorization(isAuth, state)))
    }
    return this.authService.isAuthenticated().pipe(tap(isAuth => this.handleAuthorization(isAuth, state)))
  }
  
  handleAuthorization(isAuth: boolean, state: RouterStateSnapshot) {
    if (!isAuth) {
      this.router.navigate(['/welcome/sign-in'], 
        {
          queryParams: {
            returnUrl: state.url
          }
        });
    }
  }    
}
