import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LilaComponent } from './lila.component';

describe('LilaComponent', () => {
  let component: LilaComponent;
  let fixture: ComponentFixture<LilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
