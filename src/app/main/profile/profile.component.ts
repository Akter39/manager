import { map, Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  nickname!: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.nickname = this.getNickname();
  }

  getNickname(): Observable<string> {
    return this.authService.getUser().pipe(map(u => u?.Nickname!));
  }
}
