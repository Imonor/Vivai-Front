import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vivai-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  coucouTab = [1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  }

}
