import { Router } from '@angular/router';
import { ReceivingService } from './../../../services/receiving.service';
import { isEmpty, Observable, of, tap } from 'rxjs';
import { Competition } from './../../models/competition';
import { Component, OnInit, DoCheck } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, DoCheck {
  empetyCompetitions!: boolean;
  competitions!: Observable<Competition[]>;
  flag!: boolean;
  closeNew!: boolean;

  comp: Competition[] = [
    new Competition(89, 'Веселый дельфин', new Date(), new Date(), 50, new UserInfo()),
    new Competition(45, 'Первенство московской области', new Date(), new Date(), 50, new UserInfo())
  ];

  constructor(private receivService: ReceivingService, private router: Router) {

   }

  ngOnInit(): void {
    this.closeNew = true;
    if (this.router.url == '/main/competition/current') this.flag = true;
    if (this.router.url == '/main/competition/archive') this.flag = false;
    if(!this.empetyCompetitions) {
      this.competitions = of(this.comp);
    }
  }

  onToggle() {
    this.closeNew = !this.closeNew;
  }

  ngDoCheck(): void {
    if (this.router.url == '/main/competition') this.router.navigate(['/main/competition/current']);
  }
}