import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  constructor() {
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      "userLogin": new FormControl("", Validators.pattern("[0-9]{10}"))
    })
  }

  send(){
    console.log(this.loginForm);
  }
}
