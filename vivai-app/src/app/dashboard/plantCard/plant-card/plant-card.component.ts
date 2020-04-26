import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vivai-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plante;
  
  constructor() { }

  ngOnInit() {
  }

}
