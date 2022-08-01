import { TranslateService } from '@ngx-translate/core';
import { Distance, Distances, Genders, Styles } from './../../../models/distance';
import { Component, OnInit } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-distances',
  templateUrl: './distances.component.html',
  styleUrls: ['./distances.component.scss']
})
export class DistancesComponent implements OnInit {
  distances: Distance[] = new Array();
  constructor(private tranclate: TranslateService) { }

  ngOnInit(): void {
    this.distances.push(new Distance(Distances._50, Styles.FL, Genders.mail, this.tranclate))
  }

}