import { AuthService } from 'src/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.getUser().subscribe(u => {
      if(u && u.Token) {
        request = request.clone({
          headers: request.headers.set("Authorization",
              "Bearer " + u.Token)
      });
      }
    })
    return next.handle(request);
  }
}
