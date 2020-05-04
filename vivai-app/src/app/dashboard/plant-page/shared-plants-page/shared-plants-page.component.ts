import { Component, OnInit } from '@angular/core';
import { UserPlant } from 'src/app/models/user-plant';
import { Router } from '@angular/router';

@Component({
  selector: 'vivai-shared-plants-page',
  templateUrl: './shared-plants-page.component.html',
  styleUrls: ['./shared-plants-page.component.scss']
})
export class SharedPlantsPageComponent implements OnInit {

  listSharedPlants: UserPlant[] = null;
  display: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  catchSharedPlantsFromHistory() {
    this.listSharedPlants = history.state.data;
    if (this.listSharedPlants === undefined) {
      this.router.navigate(['/dashboard']);
    } else this.display = true;

    console.log(this.listSharedPlants);
  }

}
