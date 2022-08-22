import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUser]'
})
export class UserDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated().pipe(take(1)).subscribe(u => {
      if (u) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }
}
