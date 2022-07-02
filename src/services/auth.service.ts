import { SignInComponent } from './../app/sign-in/sign-in.component';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, concat, filter, map, Observable, take, tap } from 'rxjs';
import { User } from 'src/app/models/auth/user';
import { Role } from 'src/app/models/auth/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = 'api/sign-up';
  private signInUrl = 'api/sign-in';

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
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
    return  this.http.post<ConditionSignUp>(this.baseUrl + this.signUpUrl, control.value);
  }

  signIn(control: FormGroup): Observable<ConditionSignIn> {
    return  this.http.post<ConditionSignIn>(this.baseUrl + this.signInUrl, control.value)
      .pipe(map((condition: ConditionSignIn) => {
        if (condition && condition.CurrentUser){
          localStorage.setItem('CurrentUser', JSON.stringify(condition.CurrentUser));
          this.currentUserSubject.next(condition.CurrentUser);
        }
        return condition;
      }));
  }

  signOut(){
    localStorage.removeItem('CurrentUser');
    this.currentUserSubject.next(null);
  }
}

export interface ConditionSignUp {
  Successful: boolean;
  NameBusy: boolean;
  NicknameBusy: boolean;
  EmailBusy: boolean;
  PhoneBusy: boolean;
  NotMatchPasswords: boolean;
  MatchName: boolean;
  InvalidNameFormat: boolean;
  InvalidNicknameFormat: boolean;
  InvalidEmailFormat: boolean;
  InvalidPhoneFormat: boolean;
  InvalidPasswordFormat: boolean;
  InvalidCityFormat: boolean;
  InvalidOrganizationFormat: boolean;
}

export interface ConditionSignIn {
  Successful: boolean;
  InvalidSignIn: boolean;
  InvalidLoginFormat: boolean;
  InvalidPasswordFormat: boolean;
  CurrentUser?: User;
  EncodedJwt?: string;
}