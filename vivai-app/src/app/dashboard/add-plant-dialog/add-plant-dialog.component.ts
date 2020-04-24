import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatIconRegistry } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


interface supportedPlant {
  Species: string;
  websiteUrl: string;
}


@Component({
  selector: 'vivai-add-plant-dialog',
  templateUrl: './add-plant-dialog.component.html',
  styleUrls: ['./add-plant-dialog.component.scss']
})
export class AddPlantDialogComponent implements OnInit {
  plant: FormGroup;
  plantTypeControl = new FormControl('', Validators.required);
  filtredPlantType: Observable<supportedPlant[]>;

  //@Input()
  plantsType: supportedPlant[] = [
    {
      Species: 'Basilic',
      websiteUrl: 'coucou'
    },
    {
      Species: 'Cactus',
      websiteUrl: 'hello',
    },
    {
      Species: 'Balezo',
      websiteUrl: 'coucou'
    },
    {
      Species: 'Baezalic',
      websiteUrl: 'coucou'
    },
    {
      Species: 'Cahebzjh',
      websiteUrl: 'coucou'
    },
    {
      Species: 'Cekazj',
      websiteUrl: 'coucou'
    },
    {
      Species: 'Basilic',
      websiteUrl: 'coucou'
    },

  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPlantDialogComponent>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
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

    this.filtredPlantType = this.plantTypeControl.valueChanges
      .pipe(
        startWith(''),
        map(plantType => plantType ? this._filterPlantsType(plantType) : this.plantsType.slice())
      );
  }

  ngOnInit() {
    this.plant = this.formBuilder.group({
      type: '',
      name: '',
    })
  }

  submit(plant) {
    this.dialogRef.close(plant);
  }


  private _filterPlantsType(value: string): supportedPlant[] {
    const filterValue = value.toLowerCase();
    return this.plantsType.filter(plantType => plantType.Species.toLowerCase().indexOf(filterValue) === 0);
  }
}