import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      "userName": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{5,15}$"), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
      "userConfirmPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
      "userEmail": new FormControl("", [Validators.email, Validators.required]),
      "userPhone": new FormControl("",
       [Validators.pattern("^([+]?[0-9]{1,2})?([ ]|[-])?(([(][0-9]{3}[)])|([0-9]{3}))([ ]|[-])?([0-9]{3})([ ]|[-])?([0-9]{2})([ ]|[-])?([0-9]{2})$"),
        Validators.required]),
      "userCity": new FormControl("", [Validators.pattern("^[a-zA-Zа-яА-Я\-]{1,20}$"), Validators.required]),
      "userOrganization": new FormControl("", [Validators.pattern("^[a-zA-Zа-яА-Я0-9\'\" \-]{2,30}$"), Validators.required]),
    },
    {
      validators: passwordMatchValidator
    })
  }

  onSumbit(){
    console.log(this.signUpForm.value);
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
    //this.http.post('/api/sign-up', this.signUpForm.value).subscribe(u => console.log(u));
    console.log(this.condition);
  }

}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('userPassword');
  const confirmPassword = control.get('userConfirmPassword');
  return password && confirmPassword && password.value != confirmPassword.value ? {matchPassword: true} : null;
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