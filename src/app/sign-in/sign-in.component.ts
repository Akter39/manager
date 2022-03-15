import { RegexConstants } from './../validators/regex-constants';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserLoginValidator } from '../validators/user-login.validator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public condition: Condition = {
    successful: false,
    invalidSignIn: false,
    invalidLoginFormat: false,
  };
  loginForm!: FormGroup;
  constructor(private http: HttpClient, private router: Router) {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      "userLogin": new FormControl("", [UserLoginValidator.userLogin, Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required])
    })
  }

  onSumbit(){
    this.http.post<Condition>('/api/sign-in',this.loginForm.value)
  }
}

interface Condition {
  successful: boolean;
  invalidSignIn: boolean;
  invalidLoginFormat: boolean;
}