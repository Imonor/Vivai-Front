import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry, MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { PlantService } from 'src/app/services/plant.service';
import { UserPlant } from 'src/app/models/user-plant';
import { InfosPlant } from 'src/app/models/infos-plant';
import { NotificationService } from 'src/app/services/notification.service';
import { PlantReport } from 'src/app/models/plant-report';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { UpdatePlantDialogComponent } from './update-plant-dialog/update-plant-dialog.component';

@Component({
  selector: 'vivai-plant-page',
  templateUrl: './plant-page.component.html',
  styleUrls: ['./plant-page.component.scss']
})
export class PlantPageComponent implements OnInit {
  display: Boolean = false;
  alreadyReported: Boolean = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  plantForm: FormGroup = new FormGroup({
    water: new FormControl(),
    prune: new FormControl(),
    repoting: new FormControl(),
    harvest: new FormControl(),
    note: new FormControl()
  });

  currentPlant: UserPlant = null;
  infoCurrentPlant: InfosPlant = null;
  listReport: PlantReport[];
  sharedPlants: UserPlant[];
  public reportingForm: FormGroup;
  public readonly waterField = 'water';
  public readonly pruneField = 'prune';
  public readonly harvestField = 'harvest';
  public readonly repotingField = 'repoting';
  public readonly noteField = 'note';

  updatePlantDialogRef: MatDialogRef<UpdatePlantDialogComponent>;
  taskNumber: 0;
  profile: any = {};
  user: CognitoUser;
  userOk: boolean;

  constructor(public _loading: LoaderService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef,
    private router: Router, private fb: FormBuilder, private _plantService: PlantService,
    private _notification: NotificationService, private dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    iconRegistry.addSvgIcon(
      'water',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/water.svg'));
    iconRegistry.addSvgIcon(
      'prune',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/prune.svg'));
    iconRegistry.addSvgIcon(
      'harvest',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/harvest.svg'));
    iconRegistry.addSvgIcon(
      'repotting',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/repotting.svg'));
  }

  ngOnInit() {
    this.catchPlantFromHistory();
    this.getUserInfo();
    this.initForm();
    this.getInfoPlant();
    this.getReportings();
  }

  public get Water(): AbstractControl {
    return this.reportingForm.get(this.waterField);
  }

  public get Prune(): AbstractControl {
    return this.reportingForm.get(this.pruneField);
  }

  public get Harvest(): AbstractControl {
    return this.reportingForm.get(this.harvestField);
  }

  public get Repoting(): AbstractControl {
    return this.reportingForm.get(this.repotingField);
  }

  public get Note(): AbstractControl {
    return this.reportingForm.get(this.noteField);
  }

  getInfoPlant() {
    if (this.display) {
      this._plantService.getPlantInfos(this.currentPlant.plantId).subscribe(data => {
        this.infoCurrentPlant = data;
        //console.log(this.infoCurrentPlant);
      }
        );
    }
  }


  initForm() {
    this.reportingForm = this.fb.group({
      water: [false],
      prune: [false],
      repoting: [false],
      harvest: [false],
      note: [null]
    });
    this.taskNumber = 0;
  }


  catchPlantFromHistory() {
    this.currentPlant = history.state.data;
    if (this.currentPlant == undefined) {
      this.router.navigate(['/dashboard']);
    } else this.display = true;

    //console.log(this.currentPlant);
  }

  checkTaskNumber() {
    this.taskNumber = 0;
    setTimeout(() => {
      if (this.reportingForm.get('water').value) {
        this.taskNumber++;
      }
      if (this.reportingForm.get('prune').value) {
        this.taskNumber++;
      }
      if (this.reportingForm.get('repoting').value) {
        this.taskNumber++;
      }
      if (this.reportingForm.get('harvest').value) {
        this.taskNumber++;
      }
    });
  }

  share() {
    this.currentPlant.shared = true;
    //console.log(this.currentPlant);
    this._plantService.sharePlant(this.currentPlant).subscribe(data => {
      //console.log(data);
      this._notification.show("La plante à été partagée avec succès !", "ok");
    },
      error => {
        console.log(error);
        this._notification.show("Une erreur est survenue, Essayez plus tard.", "ok");
      }
    );
  }

  unshare() {
    this.currentPlant.shared = false;
    //console.log(this.currentPlant);
    this._plantService.sharePlant(this.currentPlant).subscribe(data => {
      //console.log(data);
      this._notification.show("Votre plante n'est plus partagée !", "ok");
    },
      error => {
        console.log(error);
        this._notification.show("Une erreur est survenue, Essayez plus tard.", "ok");
      }
    );
  }

  delete() {
    this._plantService.deleteUserPlant(this.currentPlant.id).subscribe(data => {
      //console.log(data);
      this._notification.show(data.Message, "OK");
      this.router.navigate(['/dashboard']);
    });
  }

  addReporting() {
    let reportingObj = this.reportingForm.getRawValue();
    this._plantService.addReporting(this.currentPlant.id, reportingObj).subscribe(data => {
      //console.log(data);
      if (this.isReported) {
        this._notification.show('Mise à jour effectuée avec succès !', 'ok');
      } else this._notification.show('Le reporting à été ajouté avec succes !', 'ok');
      this.clearReporting();
      this.checkTaskNumber();
      this.getReportings();
      this.isReported();
    },
      error => {
        console.log(error);
        this._notification.show(error, 'ok');
      }
    );


  }

  getReportings() {
    if (this.display) {
      this._plantService.getReportings(this.currentPlant.id).subscribe(data => {
        this.listReport = data;
        this.isReported();
      }
      );
    }
  }

  clearReporting() {
    this.Water.setValue(false);
    this.Prune.setValue(false);
    this.Harvest.setValue(false);
    this.Repoting.setValue(false);
    this.Note.setValue(null);
  }

  isReported() {
    let dateLastReporting;
    let dateOfDay = new Date();
    let month;
    let day;
    if (dateOfDay.getMonth() < 9) {
      month = ('0' + (dateOfDay.getMonth() + 1));
    } else {
      month = dateOfDay.getMonth() + 1;
    }
    if (dateOfDay.getDate() < 10) {
      day = ('0' + dateOfDay.getDate());
    } else {
      day = dateOfDay.getDate();
    }
    if (this.listReport.length > 0) {
      dateLastReporting = this.listReport[this.listReport.length - 1].date;
    }

    //console.log('date dernier reporting : ' + dateLastReporting);
    let newDateOfDay = (dateOfDay.getFullYear() + '-' + month + '-' + day);
    if (newDateOfDay === dateLastReporting) {
      this.alreadyReported = true;
    }
    //console.log("reported ? : " + this.alreadyReported);
  }

  goToLilaPlant() {
    this.router.navigate(['/lila-plant'], { state: { data: this.infoCurrentPlant, data2: this.currentPlant } });
  }

  getDate(dateString) {
    let date = new Date(dateString).toISOString();
    return date;
  }

  getTooltipText(date, report) {
    let message = date;
    if (report.comment !== "null") message += "- Note : " + report.comment;
    return message;
  }

  openUpdatePlant() {
    this.updatePlantDialogRef = this.dialog.open(UpdatePlantDialogComponent, {
      disableClose: true,
      data: { currentPlant: this.currentPlant, }
    });
    this.updatePlantDialogRef.afterClosed().subscribe(result => {
      //console.log("dialogResulat", result);
      this._plantService.getUserPlantInfos(this.currentPlant.id).subscribe(data => this.currentPlant = data)
      });
  }

  goToSharedPlants() {
    this._plantService.getSharedPlants(this.currentPlant.plantId).subscribe(data => {
      this.sharedPlants = data;
      this.router.navigate(['/shared-plants-page'], { state: { data: this.sharedPlants, data2: this.currentPlant } });
    }
    );
  }

  isAuthor() {
    if (this.userOk && this.currentPlant.userId == this.user.getUsername()) return true;
    else return false
  }

  async getUserInfo() {
    this._loading.show();
    this.profile = await Auth.currentUserInfo();
    this.user = await Auth.currentAuthenticatedUser();
    this.userOk = true;
    this._loading.hide();
  }

}
