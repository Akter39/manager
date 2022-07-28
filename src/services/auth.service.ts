import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, concat, filter, map, Observable, take } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { Role } from 'src/app/models/auth/role';
import { Router } from '@angular/router';
import { ApiUrl } from 'src/app/constants/api-url.constants';
import { ConditionSignIn } from 'src/app/models/auth/condition-sign-in';
import { ConditionSignUp } from 'src/app/models/auth/condition-sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router
    ) {
    if (localStorage.getItem('CurrentUser'))
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('CurrentUser')!));
   }

   ngOnInit(){
   }

   public isAuthenticated(role?: Role[]): Observable<boolean> {
    if (role) {
      return this.getUser().pipe(filter(u => this.hasRole(role, this.currentUserSubject.value?.Roles!)), map(u => !!u))
    }
    return this.getUser().pipe(map(u => !!u));
   }

   public getUser(): Observable<User | null> {
    return concat(
      this.currentUserSubject.pipe(take(1), filter(u => !!u)),
      this.currentUserSubject.asObservable());
   }

   public hasRole(roleData: Role[], roleUser: Role[]): boolean {
    for(let i = 0; i < roleUser.length; i++) {
      if (roleData.some(u => u == roleUser[i])) {
        return true;
      }
    }
    return false;
   }
   
  signUp(control: FormGroup): Observable<ConditionSignUp> {
    return  this.http.post<ConditionSignUp>(this.baseUrl + ApiUrl.Auth.signUp, control.value, { withCredentials: true });
  }

  signIn(control: FormGroup): Observable<ConditionSignIn> {
    return  this.http.post<ConditionSignIn>(this.baseUrl + ApiUrl.Auth.signIn, control.value, { withCredentials: true })
      .pipe(map(condition => {
        if (condition && condition.CurrentUser){
          localStorage.setItem('CurrentUser', JSON.stringify(condition.CurrentUser));
          this.startRefreshTokenTimer(condition.CurrentUser);
          this.currentUserSubject.next(condition.CurrentUser);
        }
        return condition;
      }));
  }

  refreshToken(): Observable<User | null> {
    return  this.http.post<User>(this.baseUrl + ApiUrl.Auth.refreshJwt, {}, { withCredentials: true })
      .pipe(map(u => {
        this.currentUserSubject.next(u);
        this.startRefreshTokenTimer(u);
        return u;
      }));
  }

  signOut(){
    this.http.post<any>(this.baseUrl + ApiUrl.Auth.revokeJwt, {}, { withCredentials: true }).subscribe();
    localStorage.removeItem('CurrentUser');
    this.stopRefreshTokenTimer();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  private startRefreshTokenTimer(user: User) {
    const jwt = JSON.parse(atob(user.Token.split('.')[1]));

    const expires = new Date(jwt.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}