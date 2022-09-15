import { Observable } from 'rxjs';
import { ReceivingService } from './../../../services/receiving.service';
import { UserInfo } from './../../../models/auth/user-info';
import { Competition } from './../../../models/competition';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.scss']
})
export class CompetitionItemComponent implements OnInit {
  @Input() item!: Competition;
  userInfo!: Observable<UserInfo>;

  constructor(private receivingService: ReceivingService) { }

  ngOnInit(): void {
    this.userInfo = this.receivingService.Users.getUserInfo(this.item.UserId);
  }

  getDate(date: Date): string {
    date = new Date(date);
    return date.toLocaleString().split(',')[0];
  }
}
