import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Distance } from 'src/app/models/distance';

@Component({
  selector: 'app-add-year-group',
  templateUrl: './add-year-group.component.html',
  styleUrls: ['./add-year-group.component.scss']
})
export class AddYearGroupComponent implements OnInit {
  @Input() isSort: boolean = true;
  @Input() distances: Distance[] = new Array();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit();
  }
}
