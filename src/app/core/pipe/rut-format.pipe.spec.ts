import { RutFormatPipe } from './rut-format.pipe';
import { RutService } from '../service/rut.service';

describe('RutFormatPipe', () => {
  let rutService: jasmine.SpyObj<RutService>;
  let pipe: RutFormatPipe;

  beforeEach(() => {
    rutService = jasmine.createSpyObj('RutService', ['formatearRut']);
    pipe = new RutFormatPipe(rutService);
  });

  it('formats a valid RUT correctly', () => {
    const input = '12345678';
    const formattedRut = '12.345.678-9';
    rutService.formatearRut.and.returnValue(formattedRut);

    const result = pipe.transform(input);

    expect(result).toBe(formattedRut);
    expect(rutService.formatearRut).toHaveBeenCalledWith(input);
  });

  it('returns an empty string when input is null', () => {
    const input = null as unknown as string;
    rutService.formatearRut.and.returnValue('');

    const result = pipe.transform(input);

    expect(result).toBe('');
    expect(rutService.formatearRut).toHaveBeenCalledWith(input);
  });

  it('returns an empty string when input is undefined', () => {
    const input = undefined as unknown as string;
    rutService.formatearRut.and.returnValue('');

    const result = pipe.transform(input);

    expect(result).toBe('');
    expect(rutService.formatearRut).toHaveBeenCalledWith(input);
  });

  it('handles an empty string input', () => {
    const input = '';
    rutService.formatearRut.and.returnValue('');

    const result = pipe.transform(input);

    expect(result).toBe('');
    expect(rutService.formatearRut).toHaveBeenCalledWith(input);
  });
});
