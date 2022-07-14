import { Router } from '@angular/router';
import { Component, DoCheck, Inject } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements DoCheck {

  constructor(private router: Router) {
  }   

  ngDoCheck() {
    if (this.router.url == '/') this.router.navigate(['/page']);
  }
}
