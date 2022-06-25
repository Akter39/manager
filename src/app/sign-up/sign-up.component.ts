import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexConstants } from '../validators/regex-constants';
import { PasswordMatchValidator } from '../validators/password-match.validator';
import { AuthService, ConditionSignUp } from 'src/services/auth.service';
import { NameMatchValidator } from '../validators/name-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck {

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

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      "UserNickname":new FormControl("", [Validators.pattern(RegexConstants.userName), Validators.required]),
      "UserName": new FormControl("", [Validators.pattern(RegexConstants.userName), Validators.required]),
      "UserPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
      "UserConfirmPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
      "UserEmail": new FormControl("", [Validators.pattern(RegexConstants.userEmail), Validators.required]),
      "UserPhone": new FormControl("", [Validators.pattern(RegexConstants.userPhone), Validators.required]),
      "UserCity": new FormControl("", [Validators.pattern(RegexConstants.userCity), Validators.required]),
      "UserOrganization": new FormControl("", [Validators.pattern(RegexConstants.userOrganization), Validators.required]),
    },
    {
      validators: [NameMatchValidator.nameMatch, PasswordMatchValidator.passwordMatch]
    })
  }

  onSumbit(){
    this.auth.signUp(this.signUpForm).subscribe((u: ConditionSignUp) => this.condition = {
      Successful: (u as any).successful,
      NameBusy: (u as any).nameBusy,
      NicknameBusy: (u as any).NicknameBusy,
      EmailBusy: (u as any).emailBusy,
      PhoneBusy: (u as any).phoneBusy,
      NotMatchPasswords: (u as any).notMatchPasswords,
      MatchName: (u as any).MatchName,
      InvalidNameFormat: (u as any).invalidNameFormat,
      InvalidNicknameFormat: (u as any).InvalidNicknameFormat,
      InvalidEmailFormat: (u as any).invalidEmailFormat,
      InvalidPhoneFormat: (u as any).invalidPhoneFormat,
      InvalidPasswordFormat: (u as any).invalidPasswordFormat,
      InvalidCityFormat: (u as any).invalidCityFormat,
      InvalidOrganizationFormat: (u as any).invalidOrganizationFormat
    });
  }

  ngDoCheck() {
    if (this.condition.Successful) {
      setTimeout (() => {
        this.router.navigate(['/welcome/sign-in']);
      }, 5000)
    }
  }
}