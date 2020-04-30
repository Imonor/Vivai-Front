import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'vivai-plant-page',
  templateUrl: './plant-page.component.html',
  styleUrls: ['./plant-page.component.scss']
})
export class PlantPageComponent implements OnInit {

  curentPlant: null;

  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'water',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/water.svg'));
        // Ajouter kes autres icons
      
     }

  ngOnInit() {
    this.catchPlantFroHistory();
  }


  catchPlantFroHistory() {
    this.curentPlant = history.state.data;
    console.log(this.curentPlant);
  }
}
