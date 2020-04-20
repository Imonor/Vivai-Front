import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vivai-lila',
  templateUrl: './lila.component.html',
  styleUrls: ['./lila.component.scss']
})
export class LilaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LilaComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
