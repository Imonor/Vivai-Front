import { Component, OnInit } from '@angular/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { LoaderService } from 'src/app/loader/loader.service';


@Component({
  selector: 'vivai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  profile:any = {};
  user: CognitoUser;
  displayName: boolean = false;

  constructor(public loading: LoaderService ) { }

  ngOnInit() {
    this.loading.show();
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
    console.log("profile",this.profile);
    console.log("user",this.user);
    this.displayName = true;
    this.loading.hide();
  }

}
