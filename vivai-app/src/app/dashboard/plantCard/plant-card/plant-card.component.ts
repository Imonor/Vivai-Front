import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vivai-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  photo = "https://media.ooreka.fr/public/image/plant/16/mainImage-full-9167564.jpg"
  constructor() { }

  ngOnInit() {
  }

}
