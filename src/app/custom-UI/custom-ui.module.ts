import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../app-routing.module';
import { DistancesComponent } from './competitions/distances/distances.component';
import { InputComponent } from './input/input.component';
import { YearGroupComponent } from './competitions/year-group/year-group.component';
import { AddDistancesComponent } from './competitions/add-distances/add-distances.component';
import { AddYearGroupComponent } from './competitions/add-year-group/add-year-group.component';



@NgModule({
  declarations: [
    InputComponent,
    DistancesComponent,
    YearGroupComponent,
    AddDistancesComponent,
    AddYearGroupComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    InputComponent,
    DistancesComponent,
    YearGroupComponent,
    AddDistancesComponent,
    AddYearGroupComponent
  ]
})
export class CustomUiModule { }
