import { YearGroupService } from '../../../services/year-group.service';
import { YearBusy } from './../../../models/year-busy';
import { filter, map, Observable, of, zip, tap, take } from 'rxjs';
import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Distance, Genders } from 'src/app/models/distance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetitionsService } from 'src/app/services/competitions.service';

@Component({
  selector: 'app-add-year-group',
  templateUrl: './add-year-group.component.html',
  styleUrls: ['./add-year-group.component.scss']
})
export class AddYearGroupComponent implements OnInit {
  //@Input() isSort: boolean = true;
  //@Input() yearGroup: YearGroup[] = new Array();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  startYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
  endYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
  genderList: Observable<string>[] = new Array();
  //currentYear!: number;
  AddYearForm!: FormGroup;
  //isMenInfinity!: boolean;
  //isWomenInfinity!: boolean;
  //freeYearMen: Observable<YearBusy[]> = new Observable<YearBusy[]>();
  //freeYearWomen: Observable<YearBusy[]> = new Observable<YearBusy[]>();


  constructor(
    private formBuilder: FormBuilder, 
    private competition: CompetitionsService,
    private yearGroup: YearGroupService) { }

  ngOnInit(): void {
    this.initializeProperties();
    this.initializeForm();
    this.onChangeItem();
  }

  initializeProperties() {
    this.yearGroup.init();
    this.startYear = this.yearGroup.intersection();
    for (let item of Object.keys(Genders)) {
      this.genderList.push(this.competition.getGenderFullName(Genders[item as keyof typeof Genders]));
    }
  }

  initializeForm() {
    this.AddYearForm = this.formBuilder.group({
      StartYear: ['', [Validators.required]],
      EndYear: ['', [Validators.required]],
      Gender: ['all'],
    });
    this.AddYearForm.get('EndYear')?.disable();
    this.AddYearForm.get('Gender')?.disable();
  }

  onClose() {
    this.close.emit();
  }

  onSumbit() {
    if (this.AddYearForm.get('Gender')?.value == 'all') {
      for (let gender of this.genderList) {
        if (this.AddYearForm.get('EndYear')?.value == '+') {
          this.addYear(
            +this.AddYearForm.get('StartYear')?.value,
            this.competition.getGenderEnum(gender));
        } else
        this.addYear(
          +this.AddYearForm.get('StartYear')?.value,
          this.competition.getGenderEnum(gender), 
          +this.AddYearForm.get('EndYear')?.value);
      }
    } else
    if (this.AddYearForm.get('EndYear')?.value == '+') {
      this.addYear(
        +this.AddYearForm.get('StartYear')?.value,
        this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value));
    } else
    this.addYear(
      +this.AddYearForm.get('StartYear')?.value,
      this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value), 
      +this.AddYearForm.get('EndYear')?.value);
    this.reloadForm();
    this.startYear = this.yearGroup.intersection();
  }

  addYear(startYear: number, gender: Genders, endYear?: number) {
    if(endYear) {
      if(gender == Genders.mail) this.yearGroup.Men.add(startYear, endYear);
      else
      if(gender == Genders.femail) this.yearGroup.Women.add(startYear, endYear);
    } else
    {
      if(gender == Genders.mail) this.yearGroup.Men.add(startYear);
      else
      if(gender == Genders.femail) this.yearGroup.Women.add(startYear);
    }
  }

  isSortToggle() {
    /*this.isSort = !this.isSort;
    if (this.isSort) {
      this.sort();
    }*/
  }

  onChangeItem() {
    this.AddYearForm.get('StartYear')?.valueChanges.subscribe(u => {
      if (u) {
        this.AddYearForm.get('EndYear')?.enable(); 
        this.AddYearForm.get('Gender')?.enable();
        let buffer: number[] = new Array();
        this.startYear.subscribe(x => {
          let start: number = -1;
          let end: number = -1;
          for (let i = 0; i < x.length; i++) {
            if(x[i].year == +u) {
              end = i;
              break;
            }
          }
          for(let i = end; i >= 0; i--) {
            console.log(x[i]);
            if(x[i].isBusy == false) start = i + 1;
            if(i == 0 || start == -1) start = 0;
          }
          console.log(start);
          if(end == -1 || start == -1) throw new Error('startYear or endYear is incorrect');
          this.endYear = of(x.filter(u => u.isBusy).slice(start, end))
        })
      } else {
        this.AddYearForm.get('EndYear')?.setValue('');
        this.AddYearForm.get('EndYear')?.disable();
        this.AddYearForm.get('Gender')?.disable();
      }
    })
  }

  reloadForm() {
    this.AddYearForm.get('StartYear')?.setValue('');
    this.AddYearForm.get('EndYear')?.setValue('');
  }
}
