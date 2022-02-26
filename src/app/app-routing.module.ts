import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const sign: Routes = [
  {path: 'page', pathMatch: 'full', component: WelcomePageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
];

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent, children: sign}, 
  {path: '', pathMatch: 'full' , redirectTo: 'welcome/page'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
