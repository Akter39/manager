import { Router } from '@angular/router';
import { Component, DoCheck, Inject } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements DoCheck {

  constructor(private router: Router, @Inject('BASE_URL') private baseUrl: string) {
  }   

  ngDoCheck() {
    if (this.router.url == '/welcome') this.router.navigate(['/welcome/page']);
  }
}
