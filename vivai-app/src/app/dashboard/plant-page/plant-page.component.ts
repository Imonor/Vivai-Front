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
  infoCurrentPlant: InfosPlant = {
    careLevel: "Modéré",
    coldResitance: "Moyenne",
    decription: "L’hibiscus est une fleur symbole des îles tropicales, très éphémère, mais se renouvelant continuellement. La palette de couleur est large pour cette plante frileuse à cultiver en pot sous nos climats.",
    ecologicalTips: [
      "Les papillons et insectes butineurs visitent souvent les fleurs d’hibiscus avec leurs étamines formant un tube.",
      "Les pousses et les feuilles de l’Hibiscus sabdariffa sont utilisées en cuisine, ainsi que ses fleurs séchées qui sont infusées pour réaliser des boissons, confitures et sirops très riches en acide ascorbique."
    ],
    family: "Malvacées",
    growth: "Normale",
    history: [
      "L’Hibiscus rosa-sinensis laisse un flou dans l’histoire botanique. On lui attribue des origines chinoises mais il n’existe plus aujourd’hui de formes sauvages de cette espèce. Elle semble être cultivée depuis l’Antiquité pour son caractère ornemental et aurait voyagé au gré des échanges commerciaux. Aujourd’hui, de nombreux cultivars issus de multiples croisements offrent une importante palette de couleurs mais aussi de dimensions de fleurs.",
      "Les autres espèces botaniques, réparties exclusivement dans des régions chaudes, ont un usage médicinal ou culinaire depuis fort longtemps pour de nombreuses civilisations. Encore aujourd’hui, les fleurs de l’espèce sabdariffa servent à de multiples usages ancestraux en Égypte."
    ],
    id: "3048ff6f-b7ed-4da1-8b00-14e0d22d5f17",
    latinName: "Hibiscus",
    pest: "On ne taille pas les autres types car les vivaces\nsont rabattues l’hiver et les annuelles meurent.",
    picUrl: "https://media.ooreka.fr/public/image/plant/545/mainImage-full-11157199.jpg",
    plantationMonths: [
      "Mars",
      "Avril"
    ],
    species: "Hibiscus",
    sunNeed: "Soleil",
    waterNeed: "Moyen"
  }
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
    this.currentPlant.shared = true;
    console.log(this.currentPlant);
    this._plantService.sharePlant(this.currentPlant).subscribe(data => {
      console.log(data);
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
    console.log(this.currentPlant);
    this._plantService.sharePlant(this.currentPlant).subscribe(data => {
      console.log(data);
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
      console.log(data);
      this._notification.show(data.Message, "OK");
      this.router.navigate(['/dashboard']);
    });
  }

  addReporting() {
    let reportingObj = this.reportingForm.getRawValue(); // {name: '', description: ''}
    // let serializedPlant = JSON.stringify(plantObj); // ne marche pas mdr
    this._plantService.addReporting(this.currentPlant.id, reportingObj).subscribe(data => {
      console.log(data);
      if (this.isReported) {
        this._notification.show('Mise a jour effectuées avec succes !', 'ok');
      } else this._notification.show('Le reporting à été ajoutée avec succes !', 'ok');
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

    console.log('date dernier reporting : ' + dateLastReporting);
    let newDateOfDay = (dateOfDay.getFullYear() + '-' + month + '-' + day);
    if (newDateOfDay === dateLastReporting) {
      this.alreadyReported = true;
    }
    console.log("reported ? : " + this.alreadyReported);
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
    if (report.comment !== "NULL") message += "- Note : " + report.comment;
    return message;
  }

  openUpdatePlant() {
    this.updatePlantDialogRef = this.dialog.open(UpdatePlantDialogComponent, {
      disableClose: true,
      data: { currentPlant: this.currentPlant, }
    });
    this.updatePlantDialogRef.afterClosed().subscribe(result => {
      console.log("dialogResulat", result);
      this._plantService.getUserPlantInfos(this.currentPlant.id).subscribe(data => {
        this.currentPlant = data;
      },
        error => this.currentPlant.nickname = "ERROR"
      );
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
