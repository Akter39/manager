import { ConditionNewCompetition } from './../../../models/condition-new-competition';
import { ReceivingService } from './../../../../services/receiving.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  newCompetitionForm!: FormGroup;
  minStart!: Date;
  maxStart!: Date;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  lengthList!: number[];
  laneList!: number[];

  public condition: ConditionNewCompetition = {
    Successful: true,
    NotOwner: false,
    InvalidName: false,
    InvalidStartDate: false,
    InvalidEndDate: false,
    InvalidRangeDate: false,
    InvalidBid: false,
    InvalidPoolLength: false,
    InvalidPoolLanes: false,
    InvalidContributuon: false,
    InvalidMaxMembers: false,
    InvalidMaxComands: false,
    InvalidMaxComandsMembers: false,
    NotPay: false,
  }

  constructor(private http: HttpClient, private receivingService: ReceivingService) { }

  ngOnInit(): void {
    this.lengthList = [25, 50];
    this.laneList = [4, 8];
    this.minStart = new Date();
    this.maxStart = new Date();
    this.maxStart.setFullYear(this.maxStart.getFullYear() + 1);
    this.newCompetitionForm = new FormGroup ({
      "Name": new FormControl(),
      "Organization": new FormControl("МБУ\"ФСК\"Пушкино\""),
      "City": new FormControl("Пушкино"),
      "StartCompetition": new FormControl(),
      "EndCompetition": new FormControl(),
      "PoolLength": new FormControl(),
      "PoolLanes": new FormControl(),
      "BidDay": new FormControl(),
      "Contribution": new FormControl(),
      "Individual": new FormControl(),
      "InvitOnly": new FormControl(),
      "MaxMembers": new FormControl(),
      "MaxComands": new FormControl(),
      "MaxComandMembers": new FormControl(),
    });
  }

  onClose() {
    this.close.emit();
  }

  onSumbit() {
    this.receivingService.Competition.newCompetition(this.newCompetitionForm).subscribe(u => {
      this.condition = u;
      if (u.Successful) {
        this.close.emit();
      }
    });
  }
}