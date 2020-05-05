import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
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
  public reportingForm: FormGroup;
  public readonly waterField = 'water';
  public readonly pruneField = 'prune';
  public readonly harvestField = 'harvest';
  public readonly repotingField = 'repoting';
  public readonly noteField = 'note';
  taskNumber: 0;

  constructor(public _loading: LoaderService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef,
    private router: Router, private fb: FormBuilder, private _plantService: PlantService,
    private _notification: NotificationService,
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
      'potting',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/potting.svg'));
  }

  ngOnInit() {
    this.catchPlantFromHistory();
    this.initForm();
    this.getInfoPlant();
    this.listReport = new Array<PlantReport>();
    this.listReport.push(new PlantReport("2020-05-04",true, false,false, true, "Petit commentaire plutôt sympa"));
    this.listReport.push(new PlantReport("2020-06-04",true, true,false, true, "Petit commentaire plutôt sympa"));
    this.listReport.push(new PlantReport("2020-07-04",true, false,true, true, "Petit commentaire plutôt sympa"));
    this.listReport.push(new PlantReport("2020-08-04",true, false,false, false, "Petit commentaire plutôt sympa"));
    this.listReport.push(new PlantReport("2020-09-04",false, false,false, true, "Petit commentaire plutôt sympa"));
    this.listReport.push(new PlantReport("2020-10-04",true, false,false, false, "Petit commentaire plutôt sympa"));
    //this.getReportings();
    this.isReported();
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
      this._plantService.getPlantInfos(this.currentPlant.plantId).subscribe(data =>
        this.infoCurrentPlant = data);
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

    console.log(this.currentPlant);
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

  }

  delete() {
    this._plantService.deleteUserPlant(this.currentPlant.id).subscribe(data => {
      console.log(data);
      this._notification.show(data.Message, "OK");
      this.router.navigate(['/dashboard']);
    }
    )
  }

  addReporting() {
    let reportingObj = this.reportingForm.getRawValue(); // {name: '', description: ''}
    // let serializedPlant = JSON.stringify(plantObj); // ne marche pas mdr
    this._plantService.addReporting(this.currentPlant.id, reportingObj).subscribe(data => {
      console.log(data);
      this._notification.show('Le reporting à été ajoutée avec succes !', 'ok');
    },
      error => {
        console.log(error);
        this._notification.show(error, 'ok');
      }
    );
    this.clearReporting();
    this.checkTaskNumber();
  }

getReportings() {
  if (this.display) {
    this._plantService.getReportings(this.currentPlant.plantId).subscribe(data =>
    this.lastReportings = data);
    console.log("derniers reportings : " + this.lastReportings);
  }


clearReporting() {
  this.Water.setValue(false);
  this.Prune.setValue(false);
  this.Harvest.setValue(false);
  this.Repoting.setValue(false);
  this.Note.setValue(null);
}

isReported() {
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
  /*
  let dateLastReporting = this.lastReportings[0].get('date');
  console.log('date dernier reporting : ' + dateLastReporting);
  let newDateOfDay = (dateOfDay.getFullYear() + '-' + month + '-' + day);
  if (newDateOfDay === dateLastReporting) {
    this.alreadyReported = true;
  }
  */
}

goToLilaPlant() {
  this.router.navigate(['/lila-plant'], {state: {data: this.infoCurrentPlant}});
}

}
