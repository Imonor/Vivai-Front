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

  listPlant: UserPlant[] = null;
  // listPlant = [
  //   {
  //     id: "azgjhe",
  //     plantId: "dhuazhje",
  //     userId: "bajhdbjhaz",
  //     nickname: "Marco",
  //     location: "Cuisine",
  //     temperature: "20°C - 22.5°C",
  //     sunExpo: "Moyen",
  //     shared: false,
  //     picUrl: "https://media.ooreka.fr/public/image/plant/16/varietyImage/10l1k2476if4404sgowwc8kow-source-9229039.jpg",
  //     species: "Basilic",
  //   }
  // ];

  constructor(private dialog: MatDialog, private _plantService: PlantService, public _loading: LoaderService) { }

  ngOnInit() {
    // this._loading.show("waiting for listPlant"); Pour l'instant ca bug
    this.getListUserPlant();
  }


  openAddNewPlant() {
    this.addPlantDialogRef = this.dialog.open(AddPlantDialogComponent, { disableClose: true });
    this.addPlantDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getListUserPlant();
    });
  }

  getListUserPlant() {
    this._plantService.getListUserPlants().subscribe(data => {
      console.log(data);
      this.listPlant = data;
    })
    // if(this.listPlante != undefined ) this._loading.hide();
  }

}
