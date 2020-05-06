import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { InfosPlant } from 'src/app/models/infos-plant';

@Component({
  selector: 'vivai-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public plant: InfosPlant) { }

  ngOnInit() {
    console.log(this.plant);
  }

}
