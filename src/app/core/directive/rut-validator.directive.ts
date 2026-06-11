import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {RutService} from "../service/rut.service";

@Directive({
  selector: '[appRutValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RutValidatorDirective,
    multi: true
  }]
})
export class RutValidatorDirective implements Validator {

  constructor(private readonly rutService: RutService) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (!this.rutService.validarRut(value)) {
      return { rutInvalido: true };
    }

    return null;
  }

}
