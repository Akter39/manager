import { AuthService } from 'src/services/auth.service';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  nickname!: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.nickname = this.getNickname();
  }

  getNickname(): Observable<string> {
    return this.authService.getUser().pipe(map(u => u?.Nickname!));
  }
}
