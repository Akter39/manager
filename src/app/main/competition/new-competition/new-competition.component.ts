import { CompetitionsService } from '../../../services/competitions.service';
import { CookieService } from '../../../services/cookie.service';
import { Distance, Distances, Genders, Styles } from './../../../models/distance';
import { RegexUser, RegexCompetition } from './../../../constants/regex.constants';
import { filter, from, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConditionNewCompetition } from './../../../models/condition-new-competition';
import { ReceivingService } from '../../../services/receiving.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Role } from 'src/app/models/auth/role';
import { DOCUMENT } from '@angular/common';
import { YearGroupService } from 'src/app/services/year-group.service';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  isFullScreen!: boolean;
  toggleDistances!: boolean;
  toggleYearGroup!: boolean;
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
  distances: Distance[] = new Array();
  isSortDistance!: boolean;

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
    private cookieService: CookieService,
    private competition: CompetitionsService,
    private formBuilder: FormBuilder,
    private yearGroup: YearGroupService,
    @Inject(DOCUMENT) document: Document) { }

  ngOnInit(): void {
    this.initializeProperties();
    this.initializeDate();
    this.initializeForm();
    this.onChangeStart();
  }

  initializeProperties() {
    this.toggleYearGroup = false;
    this.toggleDistances = false;
    this.isFullScreen = false;
    this.lengthList = [25, 50];
    this.laneList = [4, 8];
    this.isSortDistance = true;
    this.yearGroup.init();
  }

  initializeDate() {
    this.currentDate = new Date();
    this.minStart = new Date(new Date().setDate(this.currentDate.getDate() + 2)).toISOString().slice(0,10);
    this.maxStart = new Date(new Date().setDate(this.currentDate.getDate() + 174)).toISOString().slice(0,10);
  }

  initializeForm() {
    this.newCompetitionForm = this.formBuilder.group ({
      Name: ['', [Validators.required, Validators.pattern(RegexCompetition.name)]],
      Organization: [this.getOrganization(),
        [Validators.required, Validators.pattern(RegexUser.userOrganization)]],
      City: [this.getCity(), [Validators.required, Validators.pattern(RegexUser.userCity)]],
      StartCompetition: ['', [Validators.required]],
      EndCompetition: ['', [Validators.required]],
      PoolLength: ['', [Validators.required, Validators.pattern(RegexCompetition.poolLength)]],
      PoolLanes: ['', [Validators.required, Validators.pattern(RegexCompetition.poolLanes)]],
      BidDay: ['2', [Validators.required, Validators.min(2), Validators.max(30)]],
      Contribution: ['0', [Validators.required, Validators.min(0)]],
      Individual: [false, [Validators.required]],
      InvitOnly: [false, [Validators.required]],
      MaxMembers: ['', [Validators.required, Validators.min(-1)]],
      MaxComands: ['', [Validators.required, Validators.min(-1)]],
      MaxComandMembers: ['', [Validators.required, Validators.min(-1)]],
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

  onClear() {
    this.distances = [];
  }

  onToggleAdd(isSort: boolean) {
    this.isSortDistance = isSort;
    this.toggleDistances = !this.toggleDistances;
  }

  onFullScreenToggle() {
    if (!this.isFullScreen) {
      document.getElementById('main')!.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  of(object: any) {
    return of(object);
  }

  onToggleAddYear() {
    this.toggleYearGroup = !this.toggleYearGroup;
  }

  onClearYear() {
    this.yearGroup.clear();
  }
}