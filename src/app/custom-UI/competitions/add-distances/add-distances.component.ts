import { Observable, BehaviorSubject, isEmpty } from 'rxjs';
import { CompetitionsService } from './../../../../services/competitions.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distance, Distances, Genders, Styles } from 'src/app/models/distance';

@Component({
  selector: 'app-add-distances',
  templateUrl: './add-distances.component.html',
  styleUrls: ['./add-distances.component.scss']
})
export class AddDistancesComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  distanceList: Observable<string>[] = new Array();
  styleList!: Observable<string>[];
  bufferStyleList: Observable<string>[] = new Array();
  genderList: Observable<string>[] = new Array();
  Distances: Distance[] = new Array();
  AddDistancesForm!: FormGroup;
  isStyle!: boolean;
  isGender!: boolean;

  constructor(private formBuilder: FormBuilder, private competition: CompetitionsService) { }

  ngOnInit(): void {
    this.initializeProperties();
    this.initializeForm();
    this.onChangeItem();
  }

  initializeProperties() {
    for (let item of Object.keys(Distances)) {
      this.distanceList.push(this.competition.getDistanceFullName(Distances[item as keyof typeof Distances]))
    }

    for (let item of Object.keys(Styles)) {
      this.bufferStyleList.push(this.competition.getStyleFullName(Styles[item as keyof typeof Styles]));
    }

    for (let item of Object.keys(Genders)) {
      this.genderList.push(this.competition.getGenderFullName(Genders[item as keyof typeof Genders]));
    }

    this.isStyle = true;
    this.isGender = true;
  }

  initializeForm() {
    this.AddDistancesForm = this.formBuilder.group({
      "Distance": ['', [Validators.required]],
      "Style": ['1'],
      "Gender": ['1']
    });
    this.AddDistancesForm.get('Style')?.disable();
    this.AddDistancesForm.get('Gender')?.disable();
  }

  onClose() {
    this.close.emit();
  }

  onSumbit() {
    console.log(this.AddDistancesForm.get('Style')?.value);
    let distance: Distance = new Distance(
      this.competition.getDistanceEnum(this.AddDistancesForm.get('Distance')?.value),
      this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value),
      this.competition.getGenderEnum(this.AddDistancesForm.get('Gender')?.value),
      this.competition);
    if (!this.itemExist(distance)) {
      this.Distances.push(distance);
    }
  }

  onChangeItem() {
    this.AddDistancesForm.get('Distance')?.valueChanges.subscribe(u => {
      if (u) {
        this.AddDistancesForm.get('Style')?.enable();
        this.AddDistancesForm.get('Gender')?.enable();
        switch(this.competition.getDistanceEnum(u)) {
          case Distances._50: {
            this.styleList = this.bufferStyleList.slice(0, 4);
            if (this.AddDistancesForm.get('Style')?.pristine) break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.IM:
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('1');
                break;
              }
            }
            break;
          }; 
          case Distances._100: 
          case Distances._200: 
          case Distances._400: 
          case Distances._800: 
          case Distances._1500: {
            this.styleList = this.bufferStyleList.slice(0, 5);
            if (this.AddDistancesForm.get('Style')?.pristine) break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('1');
                break;
              }
            }
            break;
          };
          case Distances._4x100:
          case Distances._4x200: {
            this.styleList = this.bufferStyleList.slice(5, 7);
            if (this.AddDistancesForm.get('Style')?.pristine) break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.FL:
              case Styles.BK:
              case Styles.BR:
              case Styles.FR:
              case Styles.IM: {
                this.AddDistancesForm.get('Style')?.setValue('1');
                break;
              }
            }
            break;
          };
        }
      } else {
        this.AddDistancesForm.get('Style')?.disable();
        this.AddDistancesForm.get('Style')?.setValue('1');
        this.AddDistancesForm.get('Gender')?.disable();
        this.AddDistancesForm.get('Gender')?.setValue('1');
      }
    });
  }

  private itemExist(distance: Distance): boolean {
    let flag: boolean = false;
    this.Distances.forEach(element => {
      if (this.Distances.some(u => u._distance == distance._distance) 
        && this.Distances.some(u => u._style == distance._style)
        && this.Distances.some(u => u._gender == distance._gender))
        flag = true;
    });
    return flag;
  }
}