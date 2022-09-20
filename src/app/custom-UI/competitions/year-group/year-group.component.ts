import { YearGroup } from 'src/app/models/year-group';
import { YearGroupService } from '../../../services/year-group.service';
import { Genders } from './../../../models/distance';
import { Component, EventEmitter, Input, OnInit, Optional, Output, DoCheck } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-year-group',
  templateUrl: './year-group.component.html',
  styleUrls: ['./year-group.component.scss']
})
export class YearGroupComponent implements OnInit, DoCheck {
  @Input() newYearGroup: boolean = false;
  _isEdit: boolean = false;
  @Input() set isEdit(value: boolean) {
    this._isEdit = value; 
  }
  @Input() yearGroups!: YearGroup[];
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  isAdditional!: boolean;
  additionalMen: string[] = new Array();
  additionalWomen: string[] = new Array();
  Genders = Genders;
  form!: FormGroup;

  constructor(
    public yearGroup: YearGroupService,
     @Optional() private fgd: FormGroupDirective,
     private fb: FormBuilder) { }

  ngOnInit(): void {
    if(!!this.yearGroups) {
      this.yearGroup.init(this.yearGroups);
      console.log(this.yearGroup.yearGroups);
      this.reloadForm('reload');
    }
    this.isAdditional = false;
    this.reloadForm('init');
    this.additional();
  }

  ngDoCheck() {
    this.reloadForm('reload');
  }

  onClear() {
    this.additionalWomen = [];
    this.additionalMen = [];
    this.clear.emit();
  }

  onDeleteItem(i: number) {
    this.deleteItem.emit(i);
  }

  onAdd() {
    this.add.emit();
  }

  reloadForm(flag: string) {
    this.form = this.fb.group({
      YearGroups: this.fb.array(this.yearGroup.yearGroups.map(x => this.fb.group({
      StartYear: x.startYear,
      EndYear: x.endYear,
      Infinity: x.infinity,
      Gender: x.gender
      })))
    });
   
    if (this.fgd) {
      switch(flag) {
        case 'reload': {
          this.fgd.form?.setControl('YearGroups', <FormArray>this.form.get('YearGroups'));
          break;
        }
        case 'init': {
          this.fgd.form?.addControl('YearGroups', <FormArray>this.form.get('YearGroups'));
          break;
        }
      }
    }
  }

  gender(index: number): boolean {
    if(this.yearGroup.yearGroups[index].gender == Genders.mail) return true;
    return false;
  }

  additional() {
    let menLength!: number;
    let womenLength!: number;
    menLength = this.yearGroup.yearGroups.filter(u => u.gender == Genders.mail).length;
    womenLength = this.yearGroup.yearGroups.filter(u => u.gender == Genders.femail).length;
    let i: number = menLength - womenLength;
    if (i == 0) return;
    else this.isAdditional = true;
    if (i > 0) {
      for (let j = 0; j < Math.abs(i); j++) {
        this.additionalWomen.push("");
      }
      return;
    }
    if (i < 0) {
      for (let j = 0; j < Math.abs(i); j++) {
        this.additionalMen.push("");
      }
    }
  }
}
