import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { DatePipe } from '@angular/common';
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
import { AddPlantDialogComponent } from './dashboard/add-plant-dialog/add-plant-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { PlantPageComponent } from './dashboard/plant-page/plant-page.component';
import { RecommendationsComponent } from './dashboard/plant-page/recommendations/recommendations.component';
import { LilaPlantComponent } from './dashboard/plant-page/lila-plant/lila-plant.component';
import { SharedPlantsPageComponent } from './dashboard/plant-page/shared-plants-page/shared-plants-page.component';
import { UpdatePlantDialogComponent } from './dashboard/plant-page/update-plant-dialog/update-plant-dialog.component';

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
    AddPlantDialogComponent,
    PlantPageComponent,
    RecommendationsComponent,
    LilaPlantComponent,
    SharedPlantsPageComponent,
    UpdatePlantDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [IosInstallComponent, LoaderComponent, CountryCodeSelectComponent, LilaComponent, AddPlantDialogComponent,
                    UpdatePlantDialogComponent],
})
export class AppModule {
}
