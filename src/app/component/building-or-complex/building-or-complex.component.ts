import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-building-or-complex',
  imports: [],
  templateUrl: './building-or-complex.component.html',
  styleUrl: './building-or-complex.component.scss'
})
export class BuildingOrComplexComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal<boolean>(false);
  copiedMessage: string = '';
  private emailSubject = "Hola, podemos contratar agua purificada en mi comunidad";;
  private emailBody = "Puedes revisar el sitio www.purezadelsur.cl y contratar el servicio sin costo!";
  private snackBar = inject(MatSnackBar);

   ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 767px)']).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  copyToClipboardAndSendToEmail() {
    const emailAddress = 'purezadelsur@gmail.com';
    navigator.clipboard.writeText(emailAddress).then(() => {
      this.snackBar.open('Correo copiado al portapapeles!', 'Cerrar', { duration: 3000 });
      setTimeout(() => {
        window.open(`mailto:?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`, '_blank');
      }, 3000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      this.copiedMessage = 'Error al copiar';
    });
  }

  copyToClipboardAndSendToWhatsApp() {
    const link = '+56984428760';
    navigator.clipboard.writeText(link).then(() => {
      this.snackBar.open('Enlace copiado al portapapeles!', 'Cerrar', { duration: 3000 });
      setTimeout(() => {
        window.open(`https://wa.me`, '_blank');
      }, 3000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      this.copiedMessage = 'Error al copiar';
    });
  }
}
