import { UserRolesDirective } from './user-roles.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserRolesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserRolesDirective
  ]
})
export class DirectivesModule { }
