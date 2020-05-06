import { Component, OnInit, Inject } from '@angular/core';
import { UserPlant } from 'src/app/models/user-plant';

@Component({
  selector: 'vivai-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public currentPlant: UserPlant) { }

  ngOnInit() {
  }

}
