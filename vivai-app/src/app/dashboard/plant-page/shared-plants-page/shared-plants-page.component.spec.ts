import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPlantsPageComponent } from './shared-plants-page.component';

describe('SharedPlantsPageComponent', () => {
  let component: SharedPlantsPageComponent;
  let fixture: ComponentFixture<SharedPlantsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPlantsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPlantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
