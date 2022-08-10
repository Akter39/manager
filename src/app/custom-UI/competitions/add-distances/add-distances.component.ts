import { Style } from 'src/app/models/style';
import { Observable, BehaviorSubject, isEmpty } from 'rxjs';
import { CompetitionsService } from './../../../../services/competitions.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Distance, Distances, Genders, Styles } from 'src/app/models/distance';

@Component({
  selector: 'app-add-distances',
  templateUrl: './add-distances.component.html',
  styleUrls: ['./add-distances.component.scss']
})
export class AddDistancesComponent implements OnInit {
  @Input() isSort: boolean = true;
  @Input() distances: Distance[] = new Array();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  distanceList: Observable<string>[] = new Array();
  styleList!: Observable<string>[];
  bufferStyleList: Observable<string>[] = new Array();
  genderList: Observable<string>[] = new Array();
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
      "Style": ['all'],
      "Gender": ['all']
    });
    this.AddDistancesForm.get('Style')?.disable();
    this.AddDistancesForm.get('Gender')?.disable();
  }

  onClose() {
    this.close.emit();
  }

  onSumbit() {
    if (this.AddDistancesForm.get('Style')?.value == 'all' && this.AddDistancesForm.get('Gender')?.value != 'all') {
      for (let item of this.styleList) {
        this.addDistance(
          this.competition.getDistanceEnum(this.AddDistancesForm.get('Distance')?.value),
          this.competition.getStyleEnum(item),
          this.competition.getGenderEnum(this.AddDistancesForm.get('Gender')?.value)
        )
      }
      return;
    }
    if (this.AddDistancesForm.get('Style')?.value != 'all' && this.AddDistancesForm.get('Gender')?.value == 'all') {
      for (let item of this.genderList) {
        this.addDistance(
          this.competition.getDistanceEnum(this.AddDistancesForm.get('Distance')?.value),
          this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value),
          this.competition.getGenderEnum(item)
        )
      }
      return;
    }
    if (this.AddDistancesForm.get('Style')?.value == 'all' && this.AddDistancesForm.get('Gender')?.value == 'all') {
      for (let style of this.styleList) {
        for (let gender of this.genderList) {
          this.addDistance(
            this.competition.getDistanceEnum(this.AddDistancesForm.get('Distance')?.value),
            this.competition.getStyleEnum(style),
            this.competition.getGenderEnum(gender)
          )
        }
      }
      return;
    }

    this.addDistance(
      this.competition.getDistanceEnum(this.AddDistancesForm.get('Distance')?.value),
      this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value),
      this.competition.getGenderEnum(this.AddDistancesForm.get('Gender')?.value),);
  }

  addDistance(distance: Distances, style: Styles, gender: Genders) {
    let distances: Distance = new Distance(distance, style, gender, this.competition);
    if (!this.itemExist(distances)) {
      this.distances.push(distances);
      if (this.isSort) this.sort();
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
            if (this.AddDistancesForm.get('Style')?.value == 'all') break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.IM:
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('all');
                break;
              }
            }
            break;
          }; 
          case Distances._100: 
          case Distances._200: {
            this.styleList = this.bufferStyleList.slice(0, 5);
            if (this.AddDistancesForm.get('Style')?.value == 'all') break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('all');
                break;
              }
            }
            break;
          };
          case Distances._400: {
            this.styleList = this.bufferStyleList.slice(3, 5);
            if (this.AddDistancesForm.get('Style')?.value == 'all') break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.FL:
              case Styles.BK:
              case Styles.BR: 
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('all');
                break;
              }
            }
            break;
          }
          case Distances._800:
          case Distances._1500: {
            this.styleList = this.bufferStyleList.slice(3, 4);
            if (this.AddDistancesForm.get('Style')?.value == 'all') break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.FL:
              case Styles.BK:
              case Styles.BR:
              case Styles.IM:
              case Styles.RLFR:
              case Styles.RLIM: {
                this.AddDistancesForm.get('Style')?.setValue('all');
                break;
              }
            }
            break;
          }
          case Distances._4x100:
          case Distances._4x200: {
            this.styleList = this.bufferStyleList.slice(5, 7);
            if (this.AddDistancesForm.get('Style')?.value == 'all') break;
            switch(this.competition.getStyleEnum(this.AddDistancesForm.get('Style')?.value)) {
              case Styles.FL:
              case Styles.BK:
              case Styles.BR:
              case Styles.FR:
              case Styles.IM: {
                this.AddDistancesForm.get('Style')?.setValue('all');
                break;
              }
            }
            break;
          };
        }
      } else {
        this.AddDistancesForm.get('Style')?.disable();
        this.AddDistancesForm.get('Style')?.setValue('all');
        this.AddDistancesForm.get('Gender')?.disable();
        this.AddDistancesForm.get('Gender')?.setValue('all');
      }
    });
  }

  itemExist(distance: Distance): boolean {
    if (
      this.distances.some(u => 
        u._distance == distance._distance 
        && u._style == distance._style
        && u._gender == distance._gender))
        return true;
    return false;
  }

  isSortToggle() {
    this.isSort = !this.isSort;
    if (this.isSort) {
      this.sort();
    }
  }

  sort() {
    this.distances.sort((a, b) => {
      if (Object.values(Distances).indexOf(a._distance) > Object.values(Distances).indexOf(b._distance)) return 1;
      if (Object.values(Distances).indexOf(a._distance) < Object.values(Distances).indexOf(b._distance)) return -1;
      if (Object.values(Distances).indexOf(a._distance) == Object.values(Distances).indexOf(b._distance)) {
        if (Object.values(Styles).indexOf(a._style) > Object.values(Styles).indexOf(b._style)) return 1;
        if (Object.values(Styles).indexOf(a._style) < Object.values(Styles).indexOf(b._style)) return -1;
        if (Object.values(Styles).indexOf(a._style) == Object.values(Styles).indexOf(b._style)) {
          if (Object.values(Genders).indexOf(a._gender) > Object.values(Genders).indexOf(b._gender)) return 1;
          if (Object.values(Genders).indexOf(a._gender) < Object.values(Genders).indexOf(b._gender)) return -1;
        }
      }
      return 0;
    });
  }
}