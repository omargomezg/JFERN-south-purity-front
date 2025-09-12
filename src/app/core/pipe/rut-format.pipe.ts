import { Pipe, PipeTransform } from '@angular/core';
import { RutService } from '../service/rut.service';

@Pipe({
  name: 'rutFormat'
})
export class RutFormatPipe implements PipeTransform {

  constructor(private readonly rutService: RutService) {}

  transform(value: string): string {
    return this.rutService.formatearRut(value);
  }

}
