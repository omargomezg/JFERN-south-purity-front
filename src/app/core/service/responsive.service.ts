import { inject, Injectable, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  readonly isMobile: Signal<boolean> = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait]) // Puedes agregar más breakpoints aquí
      .pipe(map(result => result.matches)),
    { initialValue: false } // Valor inicial por defecto
  );
}