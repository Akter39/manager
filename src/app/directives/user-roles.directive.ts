import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Role } from '../models/auth/role';

@Directive({
  selector: '[appUserRoles]'
})
export class UserRolesDirective implements OnInit {
  userRoles?: Role[];
  @Input()
  set appUserRole(roles: Role[]) {
    if (!roles || !roles.length) {
      throw new Error('Roles value is empty or missed');
    }
    this.userRoles = roles;
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) { }

 ngOnInit() {
   this.authService.isAuthenticated(this.userRoles).subscribe(u => {
    if (u) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
   })
 }
}
