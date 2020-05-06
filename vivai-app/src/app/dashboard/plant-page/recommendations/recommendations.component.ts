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
  months = [ {m:'J', color: false}, {m:'F', color: false}, {m:'M', color: false}, {m:'A', color: true}, {m:'M', color: true}, {m:'J', color: true}, {m:'J', color: true}, {m:'A', color: true}, {m:'S', color: false}, {m:'O', color: false}, {m:'N', color: false}, {m:'D', color: false}];

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
  }

}
