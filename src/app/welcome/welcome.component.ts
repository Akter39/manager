import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements DoCheck {


  constructor(private router: Router) {
  }

  ngDoCheck() {
    if (this.router.url == '/welcome') this.router.navigate(['/welcome/page']);
  }
}
