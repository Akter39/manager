import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      "userLogin": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{5,15}$"), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required])
    })
  }

  onSumbit(){
    console.log(this.loginForm.value);
  }
}
