import { DirectivesModule } from './../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitionItemComponent } from './competition/competition-item/competition-item.component';
import { NewCompetitionComponent } from './competition/new-competition/new-competition.component';
import { CustomUiModule } from '../custom-UI/custom-ui.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    CompetitionComponent,
    CompetitionItemComponent,
    NewCompetitionComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomUiModule,
    DirectivesModule
  ],
  exports: [
    MainComponent,
    ProfileComponent,
    CompetitionComponent,
    CompetitionItemComponent,
    NewCompetitionComponent,
  ]
})
export class MainModule { }
