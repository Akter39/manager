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
      "userLogin": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{5,15}$"), Validators.required]),
      "userPassword": new FormControl("", [Validators.pattern("^[a-zA-Z0-9]{6,20}$"), Validators.required])
    })
  }

  onSumbit(){
    console.log(this.signUpForm.value);
  }
}
