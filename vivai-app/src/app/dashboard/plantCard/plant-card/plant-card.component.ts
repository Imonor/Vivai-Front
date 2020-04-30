import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserPlant } from 'src/app/models/user-plant';

@Component({
  selector: 'vivai-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {

  @Input() plante: UserPlant;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPage() {
    this.router.navigate(['/plant-page'], {state: {data: this.plante}});
  }
}
