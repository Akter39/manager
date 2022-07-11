import { ReceivingService } from './../../../services/receiving.service';
import { Observable, of, map, filter, tap } from 'rxjs';
import { Competition } from './../../models/competition';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  empetyCompetitions!: boolean;
  competitions!: Observable<Competition[]>;
  arrowFlag!: boolean[];

  comp: Competition[] = [
    new Competition(89, 'Веселый дельфин', new Date(), new Date(), 50, new UserInfo()),
    new Competition(45, 'Первенство московской области', new Date(), new Date(), 50, new UserInfo())
  ];

  constructor(private receivService: ReceivingService) {
   }

  ngOnInit(): void {
    this.competitions = this.receivService.Competition.getCompetitions(1);
    this.competitions.pipe(tap(u => this.triggerCompetions(u)))
    if(!this.empetyCompetitions) {
      this.competitions = of(this.comp);
      this.competitions.subscribe(u => this.arrowFlag = new Array(u.length).fill(false));
    }
  }

  triggerCompetions(competitions: Competition[]) {
    if (competitions.length == 0) {
      this.empetyCompetitions = true;
    } else {
      this.empetyCompetitions = false;
    }
  }

  dropTrigger(i: number) {
    this.arrowFlag[i] = !this.arrowFlag[i];
  }
}