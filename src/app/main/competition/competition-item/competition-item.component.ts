import { Competition } from './../../../models/competition';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.scss']
})
export class CompetitionItemComponent implements OnInit {
  @Input() item!: Competition;

  constructor() { }

  ngOnInit(): void {
  }

}
