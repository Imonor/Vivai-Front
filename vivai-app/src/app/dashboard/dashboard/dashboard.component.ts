import { Component, OnInit } from '@angular/core';
import { LilaComponent } from '../../lila/lila.component';
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

  constructor(public _loading: LoaderService, private _plantService: PlantService , private dialog: MatDialog) { }

  ngOnInit() {
    this._loading.show();
    this.getUserInfo();
  }
  displayImageLila() {
    if (window.innerWidth > 1000) {
      return true;
    } else return false;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';

    this.dialog.open(LilaComponent, dialogConfig);
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    this.displayName = true;
    this._loading.hide();
  }

}
