import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserPlant } from 'src/app/models/user-plant';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import Auth, { CognitoUser } from '@aws-amplify/auth';

@Component({
  selector: 'vivai-shared-plants-page',
  templateUrl: './shared-plants-page.component.html',
  styleUrls: ['./shared-plants-page.component.scss']
})
export class SharedPlantsPageComponent implements OnInit {

  profile: any = {};
  listSharedPlants: UserPlant[] = null;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  display: Boolean = false;
  currentPlant: UserPlant = null;

  constructor(private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.getUserInfo();
    this.catchSharedPlantsFromHistory();
  }

  catchSharedPlantsFromHistory() {
    this.listSharedPlants = history.state.data;
    this.currentPlant = history.state.data2;
    if (this.listSharedPlants === undefined) {
      if (this.currentPlant === undefined) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/plant-page'], {state: { data: this.currentPlant }});
      }

    } else this.display = true;

    console.log(this.listSharedPlants);
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
  }

  goToPlantPage(plant) {
    this.router.navigate(['/plant-page'], {state: {data: plant}});
  }

}
