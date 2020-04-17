import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage/landingpage.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
