import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatIconRegistry } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from 'src/app/services/notification.service';
import { PlantService } from 'src/app/services/plant.service';
import { SupportedPlant } from 'src/app/models/supported-plant';
import { error } from 'util';

@Component({
  selector: 'vivai-add-plant-dialog',
  templateUrl: './add-plant-dialog.component.html',
  styleUrls: ['./add-plant-dialog.component.scss']
})
export class AddPlantDialogComponent implements OnInit {
  plantTypeControl = new FormControl("", Validators.required);
  plantForm: FormGroup = new FormGroup({
    plantTypeControl: this.plantTypeControl,
    nickName: new FormControl("", [Validators.min(2), Validators.max(13)]),
    location: new FormControl("", Validators.required),
    temperature: new FormControl("", Validators.required),
    sunExpo: new FormControl("", Validators.required)
  });
  filtredPlantType: Observable<SupportedPlant[]>;
  plantsType: SupportedPlant[];

  // For place selection 
  places = ["Salon", "Jardin", "Cuisine", "Chambre"];

  // For place selection 
  temperatures = ["27.5°C - 30°C", "25°C - 27.5°C", "22.5°C - 25°C", "20°C - 22.5°C", "17,5°C - 20°C", "15°C - 17.5°C", "12,5°C - 15°C", "10°C - 12.5°C", "7.5°C - 10°C", "5°C - 7.5°C", "2.5°C - 5°C", "0°C - 2.5°C"]

  // For sunExpo selection 
  sunExpos = [
    {
      value: "1",
      viewValue: "Faible",
    },
    {
      value: "2",
      viewValue: "Moyenne",
    },
    {
      value: "3",
      viewValue: "Haute",
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPlantDialogComponent>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private _plantService: PlantService,
    private _notification: NotificationService,
  ) {
    iconRegistry.addSvgIcon(
      'plant-type',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/plant-type.svg'));
    iconRegistry.addSvgIcon(
      'temperature',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/temperature.svg'));
    iconRegistry.addSvgIcon(
      'sun',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sun.svg'));
  }

  ngOnInit() {
    this._plantService.getSupportedPlants().subscribe(data => {
      this.plantsType = data;
      this.filtredPlantType = this.plantTypeControl.valueChanges
        .pipe(
          startWith(''),
          map(plantType => plantType ? this._filterPlantsType(plantType) : this.plantsType.slice())
        );
    });
  }

  get typeInput() {
    return this.plantForm.get("plantTypeControl");
  }
  get nickNameInput() {
    return this.plantForm.get("nickName");
  }
  get locationInput() {
    return this.plantForm.get("location");
  }
  get temperatureInput() {
    return this.plantForm.get("temperature");
  }
  get sunExpoInput() {
    return this.plantForm.get("sunExpo");
  }

  addPlant() {
    let plantObj = this.plantForm.getRawValue(); // {name: '', description: ''}
    // let serializedPlant = JSON.stringify(plantObj); // ne marche pas mdr
    this._plantService.insertPlant(plantObj).subscribe(data => {
      console.log(data);
      this._notification.show("La plante à été ajoutée avec succes !", "ok");
    },
      error => { console.log(error);
        this._notification.show(error, "ok"); }
    );
  }

  shouldEnableAdd() {
    return (
      !this.typeInput.valid ||
      !this.nickNameInput.valid ||
      !this.locationInput.valid ||
      !this.temperatureInput.valid ||
      !this.sunExpoInput.valid
    );
  }


  private _filterPlantsType(value: string): SupportedPlant[] {
    const filterValue = value.toLowerCase();
    return this.plantsType.filter(plantType => plantType.species.toLowerCase().indexOf(filterValue) === 0);
  }
}