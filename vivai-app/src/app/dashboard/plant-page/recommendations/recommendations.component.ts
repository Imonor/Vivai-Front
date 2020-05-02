import { Component, OnInit, Input } from '@angular/core';
import { InfosPlant } from 'src/app/models/infos-plant';

@Component({
  selector: 'vivai-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  @Input() infoCurrentPlant: InfosPlant;
  months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  constructor() { }

  ngOnInit() {
  }

}
