import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUp = '/api/sign-up';

  constructor(private http: HttpClient) { }

  signIn(control: FormGroup): Observable<Condition> {
    return  this.http.post<Condition>(this.signUp, control.value)
  }
}

export interface Condition {
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