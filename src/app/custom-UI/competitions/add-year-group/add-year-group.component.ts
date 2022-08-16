import { filter, from, map, Observable, of, zip } from 'rxjs';
import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Distance, Genders } from 'src/app/models/distance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompetitionsService } from 'src/services/competitions.service';

@Component({
  selector: 'app-add-year-group',
  templateUrl: './add-year-group.component.html',
  styleUrls: ['./add-year-group.component.scss']
})
export class AddYearGroupComponent implements OnInit {
  @Input() isSort: boolean = true;
  @Input() yearGroup: YearGroup[] = new Array();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  startYear: Observable<number[]> = new Observable<number[]>;
  endYear: Observable<number[]> = new Observable<number[]>;
  genderList: Observable<string>[] = new Array();
  currentYear!: number;
  AddYearForm!: FormGroup;
  isInfinity!: FormGroup;
  freeYearMen: Observable<number[]> = new Observable<number[]>;
  freeYearWomen: Observable<number[]> = new Observable<number[]>;


  constructor(
    private formBuilder: FormBuilder, 
    private competition: CompetitionsService) { }

  ngOnInit(): void {
    this.initializeProperties();
    this.initializeForm();
    this.onChangeItem();
  }

  initializeProperties() {
    this.currentYear = new Date().getFullYear();
    for (let i = this.currentYear; i >= 1900; i--) {
      this.freeYearMen.subscribe(u => u.push(i));
      this.freeYearWomen.subscribe(u => u.push(i));
    }

    this.intersection();

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
    this.close.emit(this.isSort);
  }

  onSumbit() {
    if (this.AddYearForm.get('Gender')?.value == 'all') {
      for (let gender of this.genderList) {
        if (this.AddYearForm.get('EndYear')?.value == '+') {
          this.addYear(
            this.AddYearForm.get('StartYear')?.value,
            this.competition.getGenderEnum(gender));
        } else
        this.addYear(
          this.AddYearForm.get('StartYear')?.value,
          this.competition.getGenderEnum(gender), 
          this.AddYearForm.get('EndYear')?.value);
      }
      return;
    }
    if (this.AddYearForm.get('EndYear')?.value == '+') {
      this.addYear(
        this.AddYearForm.get('StartYear')?.value,
        this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value));
    } else
    this.addYear(
      this.AddYearForm.get('StartYear')?.value,
      this.competition.getGenderEnum(this.AddYearForm.get('Gender')?.value), 
      this.AddYearForm.get('EndYear')?.value);
    
    this.intersection();
  }

  addYear(startYear: number, gender: Genders, endYear?: number) {
    if (endYear) {
      this.yearGroup.push(new YearGroup(startYear, false, gender, endYear));
      if (gender = Genders.mail) this.freeYearMen.subscribe(u =>  u.slice(u.indexOf(startYear), endYear - startYear + 1));
      if (gender = Genders.femail) this.freeYearWomen.subscribe(u =>  u.slice(u.indexOf(startYear), endYear - startYear + 1));
    } else {
      this.yearGroup.push(new YearGroup(startYear, true, gender));
      if (gender = Genders.mail) this.freeYearMen.subscribe(u =>  u.slice(u.indexOf(startYear)));
      if (gender = Genders.femail) this.freeYearWomen.subscribe(u =>  u.slice(u.indexOf(startYear)));
    }
  }

  intersection() {
    /*this.startYear = this.freeYearMen.filter(u => {
      let flag: boolean = false;
      for (let item of this.freeYearWomen) {
        item.subscribe((x) => {
          u.subscribe((z) => {
            if (x == z) flag = true;
          });
        });
        if (flag) return true;
      }
      return false;
    });*/
    this.startYear = zip(this.freeYearMen, this.freeYearWomen).pipe(
      filter(([men, women]) => men==women), 
      map(([men, women]) => men))
  }

  isSortToggle() {
    this.isSort = !this.isSort;
    if (this.isSort) {
      this.sort();
    }
  }

  sort() {
    
  }

  onChangeItem() {
    this.AddYearForm.get('StartYear')?.valueChanges.subscribe(u => {
      if (u) {
       this.AddYearForm.get('EndYear')?.enable(); 
       this.AddYearForm.get('Gender')?.enable();
       for (let i = this.currentYear; i >= u; i--) {
        this.endYear.subscribe(u => u.push(i));
      }
      }
    })
  }
}
