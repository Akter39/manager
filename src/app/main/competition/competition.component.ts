import { from, Observable, of } from 'rxjs';
import { Competition } from './../../models/competition';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  competitions!: Observable<Competition[]>; 
  comp: Competition[] = [
    {Id:1, Name:"nnnnnn", StartCompetition: new Date(), EndCompetition: new Date(), PoolLength: 25, UserId: 5},
    {Id:12, Name:"qwdqwfqwf", StartCompetition: new Date(), EndCompetition: new Date(), PoolLength: 50, UserId: 8}
  ];

  constructor() {
   }

  ngOnInit(): void {
    this.competitions = of(this.comp);
  }
}