import { YearGroupService } from '../../../services/year-group.service';
import { YearBusy } from './../../../models/year-busy';
import { filter, map, Observable, of, zip, tap, take } from 'rxjs';
import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Distance, Genders } from 'src/app/models/distance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetitionsService } from 'src/app/services/competitions.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-add-year-group',
  templateUrl: './add-year-group.component.html',
  styleUrls: ['./add-year-group.component.scss']
})
export class AddYearGroupComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  isInfinity!: boolean;
  startYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
  endYear: Observable<YearBusy[]> = new Observable<YearBusy[]>();
  genderList: Observable<string>[] = new Array();
  AddYearForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder, 
    private competition: CompetitionsService,
    public yearGroup: YearGroupService) { }

  ngOnInit(): void {
    this.initializeProperties();
    this.initializeForm();
    this.onChangeItem();
  }

  initializeProperties() {
    this.startYear = this.yearGroup.intersection();
    for (let item of Object.keys(Genders)) {
      this.genderList.push(this.competition.getGenderFullName(Genders[item as keyof typeof Genders]));
    }
    if (!this.yearGroup.Men.isInfinity && !this.yearGroup.Women.isInfinity) this.isInfinity = false;
    else
    this.isInfinity = true;
  }

  initializeForm() {
    this.AddYearForm = this.formBuilder.group({
      StartYear: ['', [Validators.required]],
      EndYear: [''],
      Gender: ['all'],
    });
    this.AddYearForm.get('EndYear')?.disable();
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
            this.competition.getGenderEnum(gender),
            true);
        } else if (this.AddYearForm.get('EndYear')?.value == '')
        this.addYear(
          +this.AddYearForm.get('StartYear')?.value,
          this.competition.getGenderEnum(gender),
          false);
        else
        this.addYear(
          +this.AddYearForm.get('StartYear')?.value,
          this.competition.getGenderEnum(gender),
          false, 
          +this.AddYearForm.get('EndYear')?.value);
      }
    } else
    if (this.AddYearForm.get('EndYear')?.value == '+') {
      this.addYear(
        +this.AddYearForm.get('StartYear')?.value,
        this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value),
        true);
    } else if (this.AddYearForm.get('EndYear')?.value == '')
    this.addYear(
      +this.AddYearForm.get('StartYear')?.value,
      this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value),
      false);
    else
    this.addYear(
      +this.AddYearForm.get('StartYear')?.value,
      this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value),
      false, 
      +this.AddYearForm.get('EndYear')?.value);
    this.reloadForm();
    if(this.AddYearForm.get('Gender')?.value == 'all') this.startYear = this.yearGroup.intersection();
    else
    if(this.AddYearForm.get('Gender')?.value == Genders.mail) this.startYear = this.yearGroup.Men.years;
    else
    if(this.AddYearForm.get('Gender')?.value == Genders.femail) this.startYear = this.yearGroup.Women.years;
    }

  addYear(startYear: number, gender: Genders, infinity: boolean, endYear?: number) {
    if(endYear) {
      if(gender == Genders.mail) this.yearGroup.Men.add(startYear, false, endYear);
      else
      if(gender == Genders.femail) this.yearGroup.Women.add(startYear, false, endYear);
    } else if (infinity) {
      if(gender == Genders.mail) this.yearGroup.Men.add(startYear, true);
      else
      if(gender == Genders.femail) this.yearGroup.Women.add(startYear, true);
    } else {
      if(gender == Genders.mail) this.yearGroup.Men.add(startYear, false);
      else
      if(gender == Genders.femail) this.yearGroup.Women.add(startYear, false);
    }
  }

  isSortToggle() {
    this.yearGroup.isSortToggle();
  }

  onChangeItem() {
    this.AddYearForm.get('StartYear')?.valueChanges.subscribe(u => {
      if (u) {
        this.isInfinity = false;
        this.AddYearForm.get('EndYear')?.enable(); 
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
            if(x[i].isBusy == false) {
              start = i + 1;
              this.isInfinity = true;
              break;
            }
            if(i == 0 || start == -1) start = 0;
          }
          if(end == -1 || start == -1) throw new Error('startYear or endYear is incorrect');
          this.endYear = of(x.slice(start, end))
        })
      } else {
        this.AddYearForm.get('EndYear')?.setValue('');
        this.AddYearForm.get('EndYear')?.disable();
      }
    });

    this.AddYearForm.get('Gender')?.valueChanges.subscribe(u => {
      if(u == 'all') {
        this.startYear = this.yearGroup.intersection();
        return;
      }
      let str = this.competition.getGenderEnum(u);
      if(str == Genders.mail) this.startYear = this.yearGroup.Men.years;
      if(str == Genders.femail) this.startYear = this.yearGroup.Women.years;
    });
  }

  reloadForm() {
    this.AddYearForm.get('StartYear')?.setValue('');
    this.AddYearForm.get('EndYear')?.setValue('');
  }
}
