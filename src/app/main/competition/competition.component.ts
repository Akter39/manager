import { Router } from '@angular/router';
import { ReceivingService } from '../../services/receiving.service';
import { isEmpty, Observable, of, tap } from 'rxjs';
import { Competition } from './../../models/competition';
import { Component, OnInit, DoCheck } from '@angular/core';
import { UserInfo } from 'src/app/models/auth/user-info';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, DoCheck {
  empetyCompetitions!: boolean;
  competitions!: Observable<Competition[]>;
  flag: boolean[] = new Array();
  closeNew!: boolean;

  constructor(private receivService: ReceivingService, private router: Router) {

   }

  ngOnInit(): void {
    this.closeNew = true;
    if (this.router.url == '/main/competition/upcoming') {
      this.flag[0] = true;
      this.receivService.Competition.upcomingCompetition().subscribe(u => {
        this.competitions = of(u);
      });
    }
    if (this.router.url == '/main/competition/current') {
      this.flag[1] = true;
      this.receivService.Competition.currentCompetition().subscribe(u => {
        this.competitions = of(u);
      });
    }
    if (this.router.url == '/main/competition/archive') {
      this.flag[2] = true;
      this.receivService.Competition.archiveCompetition().subscribe(u => {
        this.competitions = of(u);
      });
    }
  }

  onToggle() {
    this.closeNew = !this.closeNew;
  }

  ngDoCheck(): void {
    if (this.router.url == '/main/competition') this.router.navigate(['/main/competition/current']);
  }
}