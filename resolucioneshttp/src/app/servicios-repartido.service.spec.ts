import { TestBed } from '@angular/core/testing';

import { ServiciosRepartidoService } from './servicios-repartido.service';

describe('ServiciosRepartidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciosRepartidoService = TestBed.get(ServiciosRepartidoService);
    expect(service).toBeTruthy();
  });
});
