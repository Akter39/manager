import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexConstants } from '../validators/regex-constants';
import { PasswordMatchValidator } from '../validators/password-match.validator';
import { AuthService, Condition } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, DoCheck {

  public condition: Condition = {
    successful: false,
    nameBusy: false,
    emailBusy: false,
    phoneBusy: false,
    notMatchPasswords: false,
    invalidNameFormat: false,
    invalidEmailFormat: false,
    invalidPhoneFormat: false,
    invalidPasswordFormat: false,
    invalidCityFormat: false,
    invalidOrganizationFormat: false
  };
  signUpForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      "userName": new FormControl("", [Validators.pattern(RegexConstants.userName), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
      "userConfirmPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
      "userEmail": new FormControl("", [Validators.pattern(RegexConstants.userEmail), Validators.required]),
      "userPhone": new FormControl("",
       [Validators.pattern(RegexConstants.userPhone),
        Validators.required]),
      "userCity": new FormControl("", [Validators.pattern(RegexConstants.userCity), Validators.required]),
      "userOrganization": new FormControl("", [Validators.pattern(RegexConstants.userOrganization), Validators.required]),
    },
    {
      validators: PasswordMatchValidator.passwordMatch
    })
  }

  onSumbit(){
    this.auth.signIn(this.signUpForm).subscribe((u: Condition) => this.condition = {
      successful: (u as any).successful,
      nameBusy: (u as any).nameBusy,
      emailBusy: (u as any).emailBusy,
      phoneBusy: (u as any).phoneBusy,
      notMatchPasswords: (u as any).notMatchPasswords,
      invalidNameFormat: (u as any).invalidNameFormat,
      invalidEmailFormat: (u as any).invalidEmailFormat,
      invalidPhoneFormat: (u as any).invalidPhoneFormat,
      invalidPasswordFormat: (u as any).invalidPasswordFormat,
      invalidCityFormat: (u as any).invalidCityFormat,
      invalidOrganizationFormat: (u as any).invalidOrganizationFormat
    });
  }

  ngDoCheck() {
    if (this.condition.successful) {
      setTimeout (() => {
        this.router.navigate(['/welcome/sign-in']);
      }, 5000)
    }
  }
}