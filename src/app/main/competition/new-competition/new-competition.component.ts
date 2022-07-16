import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  newCompetitionForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.newCompetitionForm = new FormGroup ({
      "Organization": new FormControl("МБУ\"ФСК\"Пушкино\""),
      "City": new FormControl("Пушкино")
    });
  }

}
