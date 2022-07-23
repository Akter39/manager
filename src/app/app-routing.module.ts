import { CompetitionComponent } from './main/competition/competition.component';
import { ProfileComponent } from './main/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { Role } from './models/auth/role';

const sign: Routes = [
  {path: 'page', component: WelcomePageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
];

const main: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'competition/current', component: CompetitionComponent},
  {path: 'competition/archive', component: CompetitionComponent},
  {path: 'competition', component: CompetitionComponent},
];

const routes: Routes = [
  {path: '', component: WelcomeComponent, canActivate: [AuthGuard], data: {anon: 'anon'}, children: sign},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard], children: main},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
