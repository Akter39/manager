import { AuthService } from 'src/services/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../models/auth/role';

@Directive({
  selector: '[appUserRoles]'
})
export class UserRolesDirective {
  @Input() set appUserRoles(roles: Role[]) {
    console.log(roles);
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }
    /*this.auth.isAuthenticated(roles).subscribe(u => {
      if (u) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
     });*/
     let flag;
     this.auth.isAuthenticated(roles).subscribe(u => flag = u);
     console.log(flag);
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService) { }

}
