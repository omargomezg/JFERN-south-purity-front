import { RutValidatorDirective } from './rut-validator.directive';

import { RutService } from '../service/rut.service';
import { FormControl } from '@angular/forms';

describe('RutValidatorDirective', () => {
  let rutService: jasmine.SpyObj<RutService>;
  let directive: RutValidatorDirective;

  beforeEach(() => {
    rutService = jasmine.createSpyObj('RutService', ['validarRut']);
    directive = new RutValidatorDirective(rutService);
  });

  it('returns null when control value is null', () => {
    const control = new FormControl(null);

    const result = directive.validate(control);

    expect(result).toBeNull();
    expect(rutService.validarRut).not.toHaveBeenCalled();
  });

  it('returns null when control value is valid', () => {
    const control = new FormControl('12345678-9');
    rutService.validarRut.and.returnValue(true);

    const result = directive.validate(control);

    expect(result).toBeNull();
    expect(rutService.validarRut).toHaveBeenCalledWith('12345678-9');
  });

  it('returns validation error when control value is invalid', () => {
    const control = new FormControl('invalid-rut');
    rutService.validarRut.and.returnValue(false);

    const result = directive.validate(control);

    expect(result).toEqual({ rutInvalido: true });
    expect(rutService.validarRut).toHaveBeenCalledWith('invalid-rut');
  });

  it('returns null when control value is an empty string', () => {
    const control = new FormControl('');
    rutService.validarRut.and.returnValue(true);

    const result = directive.validate(control);

    expect(result).toBeNull();
    expect(rutService.validarRut).not.toHaveBeenCalled();
  });
});
