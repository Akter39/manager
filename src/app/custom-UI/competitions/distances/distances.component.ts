import { Observable, filter, of } from 'rxjs';
import { CompetitionsService } from './../../../../services/competitions.service';
import { Distances, Genders, Styles } from 'src/app/models/distance';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Distance } from './../../../models/distance';
import { Component, Input, OnInit, Output, EventEmitter, Optional, DoCheck } from '@angular/core';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ]
})
export class DistancesComponent implements OnInit, DoCheck {
  @Input() newCompetition: boolean = false;
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Input() distances: Distance[] = new Array();
  form!: FormGroup;

  constructor( 
    private fb: FormBuilder,
    @Optional() private fgd: FormGroupDirective,
    private comp: CompetitionsService) { }

  ngDoCheck(): void {
    this.reloadForm('reload');
  }

  ngOnInit(): void {
    this.reloadForm('init');
  }

  reloadForm(flag: string) {
    this.form = this.fb.group({
      Distances: this.fb.array(this.distances.map(x => this.fb.group({
      Distance: x._distance,
      Style: x._style,
      Gender: x._gender
      })))
    });
   
    if (this.fgd) {
      switch(flag) {
        case 'reload': {
          this.fgd.form?.setControl('Distances', <FormArray>this.form.get('Distances'));
          break;
        }
        case 'init': {
          this.fgd.form?.addControl('Distances', <FormArray>this.form.get('Distances'));
          break;
        }
      }
    }
  }

  onClear() {
    this.clear.emit();
  }

  onAdd() {
    this.add.emit();
  }
}