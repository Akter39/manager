import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  newCompetitionForm!: FormGroup;
  minStart!: Date;
  maxStart!: Date;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.minStart = new Date();
    this.maxStart = new Date();
    this.maxStart.setFullYear(this.maxStart.getFullYear() + 1);
    this.newCompetitionForm = new FormGroup ({
      "Organization": new FormControl("МБУ\"ФСК\"Пушкино\""),
      "City": new FormControl("Пушкино")
    });
  }

  onClose() {
    this.close.emit();
  }
}
