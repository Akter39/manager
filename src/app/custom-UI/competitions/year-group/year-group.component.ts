import { YearGroupService } from '../../../services/year-group.service';
import { Genders } from './../../../models/distance';
import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-year-group',
  templateUrl: './year-group.component.html',
  styleUrls: ['./year-group.component.scss']
})
export class YearGroupComponent implements OnInit {
  @Input() newYearGroup: boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  isAdditional!: boolean;
  additionalMen: string[] = new Array();
  additionalWomen: string[] = new Array();

  constructor(public yearGroup: YearGroupService) { }

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
    this.add.emit();
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
