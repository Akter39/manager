import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../models/auth/role';

@Directive({
  selector: '[appUserRoles]'
})
export class UserRolesDirective {
  @Input() set appUserRoles(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }
    this.auth.isAuthenticated(roles).pipe(take(1)).subscribe(u => {
      if (u) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      } 
     });
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService) { }

}
