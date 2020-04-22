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
  messages = [];

  constructor(public dialogRef: MatDialogRef<LilaComponent>, public router: Router) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  sendMessage(message: string) {
    if (message) {
      this.messages.push(new LilaMessage(message, true));
    }
  }

  receiveMessage(message: string){
    if (message) {
      this.messages.push(new LilaMessage(message, false));
    }
  }
}
