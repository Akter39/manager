import { YearGroup } from './../../../models/year-group';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-year-group',
  templateUrl: './year-group.component.html',
  styleUrls: ['./year-group.component.scss']
})
export class YearGroupComponent implements OnInit {
  @Input() newYearGroup: boolean = false;
  @Input() yearGroup: YearGroup[] = new Array();
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  men: YearGroup[] = new Array();
  women: YearGroup[] = new Array();

  constructor() { }

  ngOnInit(): void {
    this.men.push(new YearGroup(1997, true));
    this.women.push(new YearGroup(2000, false, 2002));
  }

  onClear() {
    this.clear.emit();
  }

  onAdd() {
    this.add.emit();
  }
}
