import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRepartidosComponent } from './listado-repartidos.component';

describe('ListadoRepartidosComponent', () => {
  let component: ListadoRepartidosComponent;
  let fixture: ComponentFixture<ListadoRepartidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRepartidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRepartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
