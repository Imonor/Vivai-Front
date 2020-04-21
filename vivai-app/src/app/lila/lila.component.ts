import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LilaMessage } from '../Models/lila-message';

@Component({
  selector: 'vivai-lila',
  templateUrl: './lila.component.html',
  styleUrls: ['./lila.component.scss']
})
export class LilaComponent implements OnInit {

  message1 = new LilaMessage('Bonjour, Lila à votre service', false);
  message2 = new LilaMessage('Quand arroser ma plante ?', true);
  message3 = new LilaMessage('2 fois par jour', false);
  messages = [this.message1, this.message2, this.message3];

  constructor(public dialogRef: MatDialogRef<LilaComponent>, public router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
