import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexUser } from '../constants/regex.constants';
import { PasswordMatchValidator } from '../validators/password-match.validator';
import { AuthService } from 'src/services/auth.service';
import { NameMatchValidator } from '../validators/name-match.validator';
import { ConditionSignUp } from '../models/auth/condition-sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public condition: ConditionSignUp = {
    Successful: false,
    NameBusy: false,
    NicknameBusy: false,
    EmailBusy: false,
    PhoneBusy: false,
    NotMatchPasswords: false,
    MatchName: false,
    InvalidNameFormat: false,
    InvalidNicknameFormat: false,
    InvalidEmailFormat: false,
    InvalidPhoneFormat: false,
    InvalidPasswordFormat: false,
    InvalidCityFormat: false,
    InvalidOrganizationFormat: false
  };
  signUpForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
      ) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup ({
      "UserNickname":new FormControl("", [Validators.pattern(RegexUser.userName), Validators.required]),
      "UserName": new FormControl("", [Validators.pattern(RegexUser.userName), Validators.required]),
      "UserPassword": new FormControl("", [Validators.pattern(RegexUser.userPassword), Validators.required]),
      "UserConfirmPassword": new FormControl("", [Validators.pattern(RegexUser.userPassword), Validators.required]),
      "UserEmail": new FormControl("", [Validators.pattern(RegexUser.userEmail), Validators.required]),
      "UserPhone": new FormControl("", [Validators.pattern(RegexUser.userPhone), Validators.required]),
      "UserCity": new FormControl("", [Validators.pattern(RegexUser.userCity), Validators.required]),
      "UserOrganization": new FormControl("", [Validators.pattern(RegexUser.userOrganization), Validators.required]),
    },
    {
      validators: [NameMatchValidator.nameMatch, PasswordMatchValidator.passwordMatch]
    })
  }

  onSumbit(){
    this.auth.signUp(this.signUpForm).subscribe(result => {
      this.condition = result;
      if (result.Successful) {
        this.redirectTo();
      }
    });
  }

  redirectTo() {
    setTimeout (() => {
      this.router.navigate(['/welcome/sign-in']);
    }, 2000)
  }
}