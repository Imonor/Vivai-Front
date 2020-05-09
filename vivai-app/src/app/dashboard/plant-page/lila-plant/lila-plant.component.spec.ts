import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LilaPlantComponent } from './lila-plant.component';

describe('LilaPlantComponent', () => {
  let component: LilaPlantComponent;
  let fixture: ComponentFixture<LilaPlantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LilaPlantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LilaPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
