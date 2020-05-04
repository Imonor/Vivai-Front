import { Component, OnInit } from '@angular/core';
import { LilaComponent } from '../../lila/lila.component';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { LoaderService } from 'src/app/loader/loader.service';
import { PlantService } from 'src/app/services/plant.service';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'vivai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile:any = {};
  user: CognitoUser;
  displayName: boolean = false;
  infos:any;

  constructor(public _loading: LoaderService, private _plantService: PlantService , private dialog: MatDialog) { }

  ngOnInit() {
    this.getUserInfo();
    this.getRandomInfo();
  }

  displayImageLila() {
    if (window.innerWidth > 1025) {
      return true;
    } else return false;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';

    this.dialog.open(LilaComponent, dialogConfig);
  }

  async getUserInfo() {
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    this.displayName = true;
  }

  getRandomInfo() {
    // this._loading.show();
    this._plantService.getRandomInfos().subscribe(data => {
      this.infos = data;
      // console.log(data);
      // this._loading.hide();
    }
      );
  }

}
