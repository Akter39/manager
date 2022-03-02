import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  SignUpError: boolean = false;
  signUpForm!: FormGroup;
  constructor() {
   }

  ngOnInit(): void {
    this.signUpForm = new FormGroup ({
      "userName": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{5,15}$"), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
      "userConfirmPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
      "userPhone": new FormControl("", [Validators.pattern("^[0-9]{10}$"), Validators.required]),
      "userCity": new FormControl("", [Validators.pattern("^[a-zA-Zа-яА-Я]{1,20}$"), Validators.required]),
      "userOrganization": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required]),
    })
  }

  onSumbit(){
    console.log(this.signUpForm.value);
  }
}
