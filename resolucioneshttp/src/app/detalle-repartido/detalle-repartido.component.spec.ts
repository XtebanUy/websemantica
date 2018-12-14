import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepartidoComponent } from './detalle-repartido.component';

describe('DetalleRepartidoComponent', () => {
  let component: DetalleRepartidoComponent;
  let fixture: ComponentFixture<DetalleRepartidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRepartidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
