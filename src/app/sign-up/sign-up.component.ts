import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit, DoCheck } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegexConstants } from '../validators/regex-constants';
import { PasswordMatchValidator } from '../validators/password-match.validator';

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
  SignUpError: boolean = false;
  signUpForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
<<<<<<< HEAD
      "userName": new FormControl("", [Validators.pattern(RegexConstants.userName), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
      "userConfirmPassword": new FormControl("", [Validators.pattern(RegexConstants.userPassword), Validators.required]),
=======
      "userName": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{5,15}$"), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
      "userConfirmPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
>>>>>>> 8f87758b9b9fc3d01ba39b268c6cfa30b25cff2a
      "userEmail": new FormControl("", [Validators.email, Validators.required]),
      "userPhone": new FormControl("",
       [Validators.pattern(RegexConstants.userPhone),
        Validators.required]),
      "userCity": new FormControl("", [Validators.pattern(RegexConstants.userCity), Validators.required]),
      "userOrganization": new FormControl("", [Validators.pattern(RegexConstants.userOrganization), Validators.required]),
    },
    {
<<<<<<< HEAD
      validators: PasswordMatchValidator.passwordMatch
=======
      validators: passwordMatchValidator
>>>>>>> 8f87758b9b9fc3d01ba39b268c6cfa30b25cff2a
    })
  }

  onSumbit(){
    this.http.post<Condition>('/api/sign-up', this.signUpForm.value).subscribe((u: Condition) => this.condition = {
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

interface Condition {
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