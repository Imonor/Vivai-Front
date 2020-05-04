import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InfosPlant } from 'src/app/models/infos-plant';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

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

  constructor(private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.catchInfosFromHistory();
  }

  catchInfosFromHistory() {
    this.infoCurrentPlant = history.state.data;
    if (this.infoCurrentPlant === undefined) {
      this.router.navigate(['/dashboard']);
    } else this.display = true;

    console.log(this.infoCurrentPlant);
  }

}
