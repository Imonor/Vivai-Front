import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotifyComponent } from './dashboard/notify/notify.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { UnauthGuard } from './auth/unauth.guard';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { LandingpageComponent } from './landingpage/landingpage/landingpage.component';
import { PlantPageComponent } from './dashboard/plant-page/plant-page.component';
import { LilaPlantComponent } from './dashboard/plant-page/lila-plant/lila-plant.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    {
       path: 'signin',
       component: SignInComponent,
       canActivate: [UnauthGuard]
    },
    {
       path: 'signup',
       component: SignUpComponent,
       canActivate: [UnauthGuard]
    },
    {
       path: 'confirm',
       component: ConfirmCodeComponent,
       canActivate: [UnauthGuard]
    }
 ]},
  { path: '', component: LandingpageComponent, canActivate: [UnauthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'notify', component: NotifyComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'plant-page', component: PlantPageComponent, canActivate: [AuthGuard]},
  { path: 'lila-plant', component: LilaPlantComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
