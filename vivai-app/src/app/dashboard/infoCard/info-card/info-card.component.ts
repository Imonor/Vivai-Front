import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vivai-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {


  @Input() infos;

  constructor() { }

  ngOnInit() {
  }

}
