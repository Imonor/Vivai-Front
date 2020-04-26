import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './landingpage/landingpage/landingpage.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PlantListComponent } from './dashboard/plantList/plant-list/plant-list.component';
import { PlantCardComponent } from './dashboard/plantCard/plant-card/plant-card.component';
import { InfoCardComponent } from './dashboard/infoCard/info-card/info-card.component';
import { MaterialModule } from './material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MenubtnComponent } from './dashboard/menubtn/menubtn.component';
import { HomeComponent } from './home/home.component';
import { IosInstallComponent } from './ios-install/ios-install.component';
import { NotifyComponent } from './dashboard/notify/notify.component';
import { LilaComponent } from './lila/lila.component';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './loader/loader.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { CountryCodeSelectComponent } from './auth/country-code-select/country-code-select.component';
import { FilterPipe } from './auth/country-code-select/filter.pipe';
import { ProfileComponent } from './auth/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    DashboardComponent,
    PlantListComponent,
    PlantCardComponent,
    InfoCardComponent,
    MenubtnComponent,
    HomeComponent,
    IosInstallComponent,
    LilaComponent,
    NotifyComponent,
    AuthComponent,
    LoaderComponent,
    SignInComponent,
    SignUpComponent,
    ConfirmCodeComponent,
    CountryCodeSelectComponent,
    FilterPipe,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IosInstallComponent, LoaderComponent, CountryCodeSelectComponent, LilaComponent],
})
export class AppModule {
}
