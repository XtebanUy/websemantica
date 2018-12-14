import { TestBed } from '@angular/core/testing';

import { ServiciosResolucionService } from './servicios-resolucion.service';

describe('ServiciosResolucionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciosResolucionService = TestBed.get(ServiciosResolucionService);
    expect(service).toBeTruthy();
  });
});
