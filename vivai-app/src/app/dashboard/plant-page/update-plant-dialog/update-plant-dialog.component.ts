import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef, MatIconRegistry, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { PlantService } from 'src/app/services/plant.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserPlant } from 'src/app/models/user-plant';
import { Router } from '@angular/router';

@Component({
  selector: 'vivai-update-plant-dialog',
  templateUrl: './update-plant-dialog.component.html',
  styleUrls: ['./update-plant-dialog.component.scss']
})
export class UpdatePlantDialogComponent implements OnInit {



  plantForm: FormGroup = new FormGroup({
    nickName: new FormControl('', [Validators.min(2), Validators.max(13)]),
    location: new FormControl('', Validators.required),
    temperature: new FormControl('', Validators.required),
    sunExpo: new FormControl('', Validators.required)
  });
/*
  public readonly nicknameField = 'nickName';
  public readonly locationField = 'location';
  public readonly temperatureField = 'temperature';
  public readonly sunExpoField = 'sunExpo';
*/
  // For place selection
  places = ["Salon", "Jardin", "Cuisine", "Chambre"];

  // For place selection
  temperatures = ["27.5°C - 30°C", "25°C - 27.5°C", "22.5°C - 25°C", "20°C - 22.5°C", "17,5°C - 20°C", "15°C - 17.5°C",
                  "12,5°C - 15°C", "10°C - 12.5°C", "7.5°C - 10°C", "5°C - 7.5°C", "2.5°C - 5°C", "0°C - 2.5°C"]

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
  ];

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<UpdatePlantDialogComponent>,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private _plantService: PlantService,
              private _notification: NotificationService,
              @Inject(MAT_DIALOG_DATA) public currentPlant: UserPlant,
    ) {
      iconRegistry.addSvgIcon(
        'temperature',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/temperature.svg'));
      iconRegistry.addSvgIcon(
        'sun',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sun.svg'));
     }

  ngOnInit() {
    console.log(this.currentPlant);
  }
/*
  public get Nickname(): AbstractControl {
    return this.plantForm.get(this.nicknameField);
  }
  public get Location(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }
  public get Temperature(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }
  public get SunExpo(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }*/

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

  updatePlant() {
    let plantObj = this.plantForm.getRawValue();
    console.log(this.currentPlant);
    this.currentPlant.nickname = plantObj.nickName;
    this.currentPlant.location = plantObj.location;
    this.currentPlant.temperature = plantObj.temperature;
    this.currentPlant.sunExpo = plantObj.sunExpo;
    console.log("curentPlant", this.currentPlant);
    this._plantService.updatePlant(this.currentPlant).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
      this._notification.show("La plante à été modifiée avec succes !", "ok");
    },
      error => { console.log(error);
                 this._notification.show("Une erreur est survenue, Essayez plus tard.", "ok"); }
    );
  }

  shouldEnableAdd() {
    return (
      !this.nickNameInput.valid ||
      !this.locationInput.valid ||
      !this.temperatureInput.valid ||
      !this.sunExpoInput.valid
    );
  }

}
