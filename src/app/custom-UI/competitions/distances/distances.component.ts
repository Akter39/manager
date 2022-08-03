import { TranslateService } from '@ngx-translate/core';
import { Distance, Distances, Genders, Styles } from './../../../models/distance';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.scss']
})
export class DistancesComponent implements OnInit {
  @Input() newCompetition: boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Input() distances: Distance[] = new Array();
  constructor() { }

  ngOnInit(): void {
  }

  onClear() {
    this.clear.emit();
  }

  onAdd() {
    this.add.emit();
  }
}