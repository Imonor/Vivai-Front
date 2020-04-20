import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Router } from '@angular/router'

@Component({
  selector: 'vivai-lila',
  templateUrl: './lila.component.html',
  styleUrls: ['./lila.component.scss']
})
export class LilaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LilaComponent>, public router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
