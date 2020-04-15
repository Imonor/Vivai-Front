import { Component } from '@angular/core';

import { team } from '../Team';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Team',
  templateUrl: './Team.component.html',
  styleUrls: ['./Team.component.css']
})
export class TeamComponent {
  team = team;

}
