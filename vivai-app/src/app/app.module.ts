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


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    DashboardComponent,
    PlantListComponent,
    PlantCardComponent,
    InfoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
