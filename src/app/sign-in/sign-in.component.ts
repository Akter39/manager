import { RegexConstants } from './../validators/regex-constants';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserLoginValidator } from '../validators/user-login.validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  AuthenticationError: boolean = false;
  loginForm!: FormGroup;
  constructor() {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      "userLogin": new FormControl("", [userLogin(), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required])
    })
  }

  onSumbit(){
    console.log(this.loginForm.value);
  }
}

export function userLogin(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
  const userLogin = control.value.toString();
  console.log(userLogin.toString());
  const validLogin = RegexConstants.userPhone.test(userLogin) || RegexConstants.userName.test(userLogin);
  return userLogin && !validLogin ? {invalidLogin: true} : null;
  }
}