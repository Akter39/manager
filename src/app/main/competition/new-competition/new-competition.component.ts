import { CookieService } from './../../../../services/cookie.service';
import { Distances } from './../../../models/distance';
import { RegexUser, RegexCompetition } from './../../../constants/regex.constants';
import { filter } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { ConditionNewCompetition } from './../../../models/condition-new-competition';
import { ReceivingService } from './../../../../services/receiving.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/models/auth/role';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  refresh!: string;
  Role = Role;
  newCompetitionForm!: FormGroup;
  currentDate!: Date;
  minStart!: string;
  maxStart!: string;
  minEnd!: string;
  maxEnd!: string;
  maxMembers!: number;
  maxComands!: number;
  maxComandMembers!: number;
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

  constructor(
    private http: HttpClient, 
    private receivingService: ReceivingService, 
    private auth: AuthService, 
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.refresh = this.cookieService.get('RefreshToken');
    this.currentDate = new Date();
    this.lengthList = [25, 50];
    this.laneList = [4, 8];
    this.minStart = new Date(new Date().setDate(this.currentDate.getDate() + 2)).toISOString().slice(0,10);
    this.maxStart = new Date(new Date().setDate(this.currentDate.getDate() + 174)).toISOString().slice(0,10);
    this.initializeForm();
    this.onChangeStart();
  }

  initializeForm() {
    this.newCompetitionForm = new FormGroup ({
      "Name": new FormControl('', [Validators.required, Validators.pattern(RegexCompetition.name)]),
      "Organization": new FormControl(this.getOrganization(),
        [Validators.required, Validators.pattern(RegexUser.userOrganization)]),
      "City": new FormControl(this.getCity(), [Validators.required, Validators.pattern(RegexUser.userCity)]),
      "StartCompetition": new FormControl('', [Validators.required]),
      "EndCompetition": new FormControl('', [Validators.required]),
      "PoolLength": new FormControl('', [Validators.required, Validators.pattern(RegexCompetition.poolLength)]),
      "PoolLanes": new FormControl('', [Validators.required, Validators.pattern(RegexCompetition.poolLanes)]),
      "BidDay": new FormControl('2', [Validators.required, Validators.min(2), Validators.max(30)]),
      "Contribution": new FormControl('0', [Validators.required, Validators.min(0)]),
      "Individual": new FormControl(false, [Validators.required]),
      "InvitOnly": new FormControl(false, [Validators.required]),
      "MaxMembers": new FormControl('', [Validators.required, Validators.min(-1)]),
      "MaxComands": new FormControl('', [Validators.required, Validators.min(-1)]),
      "MaxComandMembers": new FormControl('', [Validators.required, Validators.min(-1)]),
    });
  }

  onClose() {
    this.close.emit();
  }

  onSumbit() {
    this.receivingService.Competition.newCompetition(this.newCompetitionForm).subscribe(u => {
      this.condition = u;
      if (u.Successful) {
        this.onClose();
      }
    });
  }

  getOrganization(): string {
    let organization: string = '';
    this.auth.getUser().pipe(filter(u => u != undefined)).subscribe(u => organization = (u?.Organization as string))
    if (organization) {
      return organization;
    } 
    else
      throw new Error("User.Organization empety, null or undefined");
  }

  getCity(): string {
    let city: string = '';
    this.auth.getUser().pipe(filter(u => u != undefined)).subscribe(u => city = (u?.City as string))
    if (city) {
      return city;
    } 
    else
      throw new Error("User.City is empety, null or undefined");
  }

  onChangeStart() {
    this.newCompetitionForm.get('StartCompetition')?.valueChanges.subscribe(u => {
      this.newCompetitionForm.get('EndCompetition')?.setValue('');
      this.minEnd = new Date(u).toISOString().slice(0, 10);
      this.maxEnd = new Date(new Date(this.minEnd).setDate(new Date(this.minEnd).getDate() + 6)).toISOString().slice(0,10);  
    });
  }
}