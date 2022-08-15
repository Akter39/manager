import { Genders } from './../../../models/distance';
import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-year-group',
  templateUrl: './year-group.component.html',
  styleUrls: ['./year-group.component.scss']
})
export class YearGroupComponent implements OnInit {
  @Input() isSort: boolean = true;
  @Input() newYearGroup: boolean = false;
  @Input() yearGroup: YearGroup[] = new Array();
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  isAdditional!: boolean;
  additionalMen: string[] = new Array();
  additionalWomen: string[] = new Array();

  constructor() { }

  ngOnInit(): void {
    this.isAdditional = false;
    this.additional();
  }

  onClear() {
    this.additionalWomen = [];
    this.additionalMen = [];
    this.clear.emit();
  }

  onAdd() {
    this.add.emit(this.isSort);
  }

  gender(index: number): boolean {
    if (this.yearGroup[index].gender == Genders.mail) return true;
    return false;
  }

  additional() {
    let i: number = this.yearGroup.filter(u => u.gender == Genders.mail).length 
      - this.yearGroup.filter(u => u.gender == Genders.femail).length;
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
