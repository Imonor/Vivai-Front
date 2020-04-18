import { 
  Component, 
  ChangeDetectorRef, 
  EventEmitter, 
  Output, 
  OnChanges} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import {Location} from '@angular/common';


@Component({
  selector: 'vivai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vivai';
  landingPage = false;
  mobileQuery: MediaQueryList;
  nav = [
    {
      'title': 'L',
      'path': '/'
    },
    {
      'title': 'D',
      'path': '/dashboard'
    }
  ];
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();
  
  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }
}