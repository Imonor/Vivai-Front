import { Component, OnInit } from '@angular/core';
import { LilaComponent } from '../../lila/lila.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'vivai-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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

    this.dialog.open(LilaComponent, dialogConfig);
  }

}
