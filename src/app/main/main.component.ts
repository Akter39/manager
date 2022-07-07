import { AuthService } from 'src/services/auth.service';
import { map, Observable } from 'rxjs';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  nickname!: Observable<string>;
  menuTrigger: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    this.nickname = this.getNickname();
  }

  getNickname(): Observable<string> {
    return this.authService.getUser().pipe(map(u => u?.Nickname!));
  }

  dropdownMenu() {
    this.menuTrigger = !this.menuTrigger;
  }

  hideMenu(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-menu') && !target.closest('.dropdownTrigger')) {
      this.menuTrigger = false;
    }
  }

  signOut() {
    this.authService.signOut();
  }

  ngDoCheck() {
    if (this.router.url == '/main') this.router.navigate(['/main/profile']);
  }
}
