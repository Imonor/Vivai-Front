import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlantDialogComponent } from './update-plant-dialog.component';

describe('UpdatePlantDialogComponent', () => {
  let component: UpdatePlantDialogComponent;
  let fixture: ComponentFixture<UpdatePlantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
