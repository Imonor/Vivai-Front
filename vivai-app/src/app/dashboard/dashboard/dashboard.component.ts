import { Component, OnInit } from '@angular/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { LoaderService } from 'src/app/loader/loader.service';
import { PlantService } from 'src/app/services/plant.service';


@Component({
  selector: 'vivai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile:any = {};
  user: CognitoUser;
  displayName: boolean = false;

  constructor(public _loading: LoaderService, private _plantService: PlantService ) { }

  ngOnInit() {
    this._loading.show();
    this.getUserInfo();
  }
  displayImageLila() {
    if (window.innerWidth > 1000) {
      return true;
    } else return false;
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    this.displayName = true;
    this._plantService.getListPlants().subscribe(data => {
      console.log(data);
    });
    this._loading.hide();
  }

}
