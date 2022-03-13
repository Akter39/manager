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
      "userLogin": new FormControl("", [UserLoginValidator.userLogin, Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required])
    })
  }

  onSumbit(){
    console.log(this.loginForm.value);
  }
}