import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { CompetitionComponent } from './competition/competition.component';


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    CompetitionComponent
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
    MainComponent
  ]
})
export class MainModule { }
