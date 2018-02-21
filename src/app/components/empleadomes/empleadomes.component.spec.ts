import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadomesComponent } from './empleadomes.component';

describe('EmpleadomesComponent', () => {
  let component: EmpleadomesComponent;
  let fixture: ComponentFixture<EmpleadomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
