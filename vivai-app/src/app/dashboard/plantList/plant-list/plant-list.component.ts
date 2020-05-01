import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddPlantDialogComponent } from '../../add-plant-dialog/add-plant-dialog.component';
import { PlantService } from 'src/app/services/plant.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { Router } from '@angular/router';
import { UserPlant } from 'src/app/models/user-plant';

@Component({
  selector: 'vivai-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

  addPlantDialogRef: MatDialogRef<AddPlantDialogComponent>;

  //listPlant: UserPlant [];
  listPlante = [
     {
       nickname: "",
       species: "Basilic",
       picUrl: "https://media.ooreka.fr/public/image/plant/16/varietyImage/10l1k2476if4404sgowwc8kow-source-9229039.jpg",
       location: "Jardin",
     }];
    // {
    //   nom: "Tomy",
    //   type: "Olivier",
    //   image: "https://media.ooreka.fr/public/image/plant/4/furtherImage/34265a2z3esks4wkcgsk8s04w-source-8883047.jpg",
    //   piece: "Jardin",
    // },
    // {
    //   nom: "Jane",
    //   type: "Campanule",
    //   image: "https://media.ooreka.fr/public/image/plant/8/furtherImage/3mq1gdyj9iecwgc4kksw4owks-source-9131594.jpg",
    //   piece: "Jardin",
    // },
    // {
    //   nom: "Julia",
    //   type: "Campanule",
    //   image: "https://media.ooreka.fr/public/image/plant/8/furtherImage/3mq1gdyj9iecwgc4kksw4owks-source-9131594.jpg",
    //   piece: "Jardin",
    // }


  constructor(private dialog: MatDialog, private _plantService: PlantService, public _loading: LoaderService) { }

  ngOnInit() {
    // this._loading.show("waiting for listPlant"); Pour l'instant ca bug
    //this.getListUserPlant();
    console.log(this.listPlante);
  }

/*
  openAddNewPlant() {
    this.addPlantDialogRef = this.dialog.open(AddPlantDialogComponent, { disableClose: true });
    this.addPlantDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getListUserPlant();
    });
  }*/

 /*getListUserPlant() {
    this._plantService.getListUserPlants().subscribe(data => {
      this.listPlante = data;
    })
    // if(this.listPlante != undefined ) this._loading.hide();
  }
  */
}
