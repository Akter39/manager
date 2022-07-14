import { RegexUser } from '../constants/regex.constants';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginValidator } from '../validators/user-login.validator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService, ConditionSignIn } from 'src/services/auth.service';
import { User } from '../models/auth/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  protected CurrentUser!: User;
  public condition: ConditionSignIn = {
    Successful: false,
    InvalidSignIn: false,
    InvalidLoginFormat: false,
    InvalidPasswordFormat: false,
    CurrentUser: this.CurrentUser,
    EncodedJwt: ""
  };
  loginForm!: FormGroup;
  constructor (
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
      ) {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      "UserLogin": new FormControl("", [UserLoginValidator.userLogin, Validators.required]),
      "UserPassword": new FormControl("", [Validators.pattern(RegexUser.userPassword), Validators.required])
    })
  }

  onSumbit(){
    this.auth.signIn(this.loginForm).subscribe(result => {
      this.condition = result;
      if (result.Successful) {
        this.redirectTo();
      }
    });
  }

  redirectTo() {
    this.router.navigate(['main']);
  }
}