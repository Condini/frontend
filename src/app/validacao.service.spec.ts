import { TestBed } from '@angular/core/testing';

import { ValidacaoService } from './validacao.service';

describe('ValidacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacaoService = TestBed.get(ValidacaoService);
    expect(service).toBeTruthy();
  });
});
