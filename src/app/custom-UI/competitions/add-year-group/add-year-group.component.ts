import { Observable, of } from 'rxjs';
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
  startYear: Observable<number>[] = new Array();
  endYear: Observable<number>[] = new Array();
  genderList: Observable<string>[] = new Array();
  currentYear!: number;
  AddYearForm!: FormGroup;
  isInfinity!: FormGroup;


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
      this.startYear.push(of(i));
    }

    for (let item of Object.keys(Genders)) {
      this.genderList.push(this.competition.getGenderFullName(Genders[item as keyof typeof Genders]));
    }
  }

  initializeForm() {
    this.AddYearForm = this.formBuilder.group({
      StartYear: ['', [Validators.required]],
      EndYear: [''],
      Gender: ['all'],
    });
    this.AddYearForm.get('EndYear')?.disable();
    this.AddYearForm.get('Gender')?.disable();
  }

  onClose() {
    this.close.emit(this.isSort);
  }

  onSumbit() {

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
        this.endYear.push(of(i));
      }
      }
    })
  }
}
