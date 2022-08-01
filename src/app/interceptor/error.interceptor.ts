import { AuthService } from 'src/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { mergeMap, Observable, of, retryWhen, delay, take, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private maxRetries: number = 2;
  private timeRetrie: number = 10000;

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      let isAuth;
      this.auth.isAuthenticated().subscribe(u => isAuth = u);
      if ([401, 403].includes(error.status) && isAuth) {
        this.auth.signOut();
      }

      const err = (error && error.error && error.error.message) || error.statusText;
      console.error(err);
      //return throwError(() => new Error(err));
      return throwError(err);
    }))
  }
}
