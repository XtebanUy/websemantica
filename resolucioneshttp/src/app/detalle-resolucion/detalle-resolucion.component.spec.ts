import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleResolucionComponent } from './detalle-resolucion.component';

describe('DetalleResolucionComponent', () => {
  let component: DetalleResolucionComponent;
  let fixture: ComponentFixture<DetalleResolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleResolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
