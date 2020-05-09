import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubtnComponent } from './menubtn.component';

describe('MenubtnComponent', () => {
  let component: MenubtnComponent;
  let fixture: ComponentFixture<MenubtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
