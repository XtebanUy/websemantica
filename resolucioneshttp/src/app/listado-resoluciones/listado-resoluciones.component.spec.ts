import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoResolucionesComponent } from './listado-resoluciones.component';

describe('ListadoResolucionesComponent', () => {
  let component: ListadoResolucionesComponent;
  let fixture: ComponentFixture<ListadoResolucionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoResolucionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoResolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
