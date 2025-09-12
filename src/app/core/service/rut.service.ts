import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutService {

  validarRut(rutCompleto: string): boolean {
    if (!rutCompleto || rutCompleto.trim().length < 3) {
      return false;
    }

    const rutLimpio = this.limpiarRut(rutCompleto);

    if (rutLimpio.length < 2) {
      return false;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    return !(!this.validarCuerpo(cuerpo) || !this.validarDigitoVerificador(cuerpo, dv));


  }

  limpiarRut(rut: string): string {
    return rut.replace(/[^0-9kK]/g, '').toUpperCase();
  }

  formatearRut(rut: string): string {
    const rutLimpio = this.limpiarRut(rut);

    if (rutLimpio.length < 2) {
      return rut;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);

    // Formatear con puntos cada 3 dígitos
    let cuerpoFormateado = cuerpo
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.')
      .split('')
      .reverse()
      .join('')
      .replace(/^\./, '');

    return `${cuerpoFormateado}-${dv}`;
  }

  calcularDigitoVerificador(cuerpo: string): string {
    let suma = 0;
    let multiplo = 2;

    // Recorrer el cuerpo de derecha a izquierda
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resultado = 11 - (suma % 11);

    if (resultado === 11) return '0';
    if (resultado === 10) return 'K';
    return resultado.toString();
  }

  private validarCuerpo(cuerpo: string): boolean {
    return /^\d+$/.test(cuerpo);
  }

  private validarDigitoVerificador(cuerpo: string, dv: string): boolean {
    const dvCalculado = this.calcularDigitoVerificador(cuerpo);
    return dv === dvCalculado;
  }
}
