import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = '/api/sign-up';
  private signInUrl = '/api/sign-in';

  constructor(private http: HttpClient) { }

  signUp(control: FormGroup): Observable<ConditionSignUp> {
    return  this.http.post<ConditionSignUp>(this.signUpUrl, control.value);
  }

  signIn(control: FormGroup): Observable<ConditionSignIn> {
    return  this.http.post<ConditionSignIn>(this.signInUrl, control.value);
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
  successful: boolean;
  invalidSignIn: boolean;
  invalidLoginFormat: boolean;
  invalidPasswordFormat: boolean;
}