import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfosPlant } from 'src/app/models/infos-plant';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserPlant } from 'src/app/models/user-plant';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';

@Component({
  selector: 'vivai-lila-plant',
  templateUrl: './lila-plant.component.html',
  styleUrls: ['./lila-plant.component.scss']
})
export class LilaPlantComponent implements OnInit {

  infoCurrentPlant: InfosPlant = null;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  display: Boolean = false;
  currentPlant: UserPlant = null;
  historyDialogRef: MatDialogRef<HistoryDialogComponent>;

  constructor(private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.catchInfosFromHistory();
  }

  catchInfosFromHistory() {
    this.infoCurrentPlant = history.state.data;
    this.currentPlant = history.state.data2;
    if (this.infoCurrentPlant === undefined) {
      this.router.navigate(['/dashboard']);
    } else this.display = true;

    console.log(this.infoCurrentPlant);
  }

  goBack() {
    if (this.currentPlant === undefined) {
      this.router.navigate(['/dashboard']);
    } else this.router.navigate(['/plant-page'], { state: { data: this.currentPlant } });
  }

  openHistoryDialog() {
    this.historyDialogRef = this.dialog.open(HistoryDialogComponent, {
      disableClose: true,
      data: this.infoCurrentPlant,
    });
  }

}
