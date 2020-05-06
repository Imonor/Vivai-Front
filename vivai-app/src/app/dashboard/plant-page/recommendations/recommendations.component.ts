import { Component, OnInit, Input } from '@angular/core';
import { InfosPlant } from 'src/app/models/infos-plant';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'vivai-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  @Input() infoCurrentPlant: InfosPlant;
  months = [ {m:'J',mois:"Janvier", color: false}, {m:'F',mois:"Février", color: false}, {m:'M',mois:"Mars", color: false}, {m:'A',mois:"Avril", color: false}, {m:'M',mois:"Mai", color: false}, {m:'J',mois:"Juin", color: false}, {m:'J',mois:"Juillet", color: false}, {m:'A',mois:"Août", color: false}, {m:'S',mois:"Septembre", color: false}, {m:'O',mois:"Octobre", color: false}, {m:'N',mois:"Novembre", color: false}, {m:'D',mois:"Décembre", color: false}];

  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,) {
    iconRegistry.addSvgIcon(
      'water-color',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/water-color.svg'));
    iconRegistry.addSvgIcon(
      'sun',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sun-color.svg'));
    iconRegistry.addSvgIcon(
      'plant',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/plant.svg'));
  }

  ngOnInit() {
    console.log(this.infoCurrentPlant);
    this.setMonths();
  }

  setMonths() {
    this.months.forEach(vm => {
      this.infoCurrentPlant.plantationMonths.forEach(pm => {
        console.log(pm);
        if(vm.mois === pm ) {
          vm.color = true;
        }
      })
    })
  }

}
