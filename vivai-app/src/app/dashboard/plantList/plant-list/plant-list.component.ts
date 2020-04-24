import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vivai-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  listPlante = [
    {
      nom: "Marco",
      type: "Basilic",
      image: "https://media.ooreka.fr/public/image/plant/16/varietyImage/10l1k2476if4404sgowwc8kow-source-9229039.jpg",
      piece: "Jardin",
    },
    {
      nom: "Tomy",
      type: "Olivier",
      image: "https://media.ooreka.fr/public/image/plant/4/furtherImage/34265a2z3esks4wkcgsk8s04w-source-8883047.jpg",
      piece: "Jardin",
    },
    {
      nom: "Jane",
      type: "Campanule",
      image: "https://media.ooreka.fr/public/image/plant/8/furtherImage/3mq1gdyj9iecwgc4kksw4owks-source-9131594.jpg",
      piece: "Jardin",
    },
    {
      nom: "Julia",
      type: "Campanule",
      image: "https://media.ooreka.fr/public/image/plant/8/furtherImage/3mq1gdyj9iecwgc4kksw4owks-source-9131594.jpg",
      piece: "Jardin",
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
