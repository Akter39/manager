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
    /*return next.handle(request).pipe(
      retryWhen(error => {
        return error.pipe(
          mergeMap((error, index) => {
            let isAuth;
            this.auth.isAuthenticated().subscribe(u => isAuth = u);
            if (index < this.maxRetries && error.status == 401 && isAuth) {
              return of(error).pipe(delay(this.timeRetrie));
            }
            
            if (error.status == 401 && isAuth) {
              this.auth.signOut();
            }
            throw error;
          })
        )
      })
    );*/
    return next.handle(request).pipe(catchError(error => {
      let isAuth;
      this.auth.isAuthenticated().subscribe(u => isAuth = u);
      if ([401].includes(error.status) && isAuth) {
        this.auth.signOut();
      }

      const err = (error && error.error && error.error.message) || error.statusText;
      console.error(err);
      //return throwError(() => new Error(err.mass));
      return throwError(err);
    }))
  }
}
