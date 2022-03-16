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
  successful: boolean;
  nameBusy: boolean;
  emailBusy: boolean;
  phoneBusy: boolean;
  notMatchPasswords: boolean;
  invalidNameFormat: boolean;
  invalidEmailFormat: boolean;
  invalidPhoneFormat: boolean;
  invalidPasswordFormat: boolean;
  invalidCityFormat: boolean;
  invalidOrganizationFormat: boolean;
}

export interface ConditionSignIn {
  successful: boolean;
  invalidSignIn: boolean;
  invalidLoginFormat: boolean;
  invalidPasswordFormat: boolean;
}