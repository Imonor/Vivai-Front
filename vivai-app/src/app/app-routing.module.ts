import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NotifyComponent } from './dashboard/notify/notify.component';
import { SpeechComponent } from './dashboard/speech/speech.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: SpeechComponent },
  { path: 'notify', component: NotifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
