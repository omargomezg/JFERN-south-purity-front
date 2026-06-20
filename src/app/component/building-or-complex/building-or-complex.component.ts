import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-building-or-complex',
  imports: [MatCard, MatCardModule],
  templateUrl: './building-or-complex.component.html',
  styleUrl: './building-or-complex.component.scss',
})
export class BuildingOrComplexComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isMobile = signal<boolean>(false);
  copiedMessage: string = '';
  private emailSubject =
    'Hola, podemos contratar agua purificada en mi comunidad';

  private emailBody = `💧 Abastecimiento de agua purificada para edificios y condominios.

💡 Instalación gratuita, rápida y no invasiva.

Implementación de racks a nivel comunitario, orientada a la comodidad de los residentes.

Información y contacto directo con la empresa:
https://purezadelsur.cl/informacion-para-administracion

+56 9 8442 8760
Aguas Pureza del Sur
Calidad Valdiviana`;

  private whatsAppBody = `*Abastecimiento de agua purificada para edificios y condominios.*

*Instalación gratuita, rápida y no invasiva.*

Implementación de racks a nivel comunitario, orientada a la comodidad de los residentes.

Información y contacto directo con la empresa:
https://purezadelsur.cl/informacion-para-administracion

+56 9 8442 8760
*Aguas Pureza del Sur*
Calidad Valdiviana`;

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  copyToClipboardAndSendToEmail() {
    const isMobileDevice = /Android|iPhone|iPad/i.test(navigator.userAgent);

    navigator.clipboard.writeText(this.emailBody)
      .then(() => {
        this.snackBar.open('¡Correo copiado al portapapeles!', 'Cerrar', {
          duration: 2000,
        });
        setTimeout(() => {
          if (isMobileDevice) {
            window.open(
              `mailto:?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`,
              '_blank',
            );
          } else {
            window.open(
              `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`,
              '_blank',
            );
          }
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al copiar: ', err);
        this.copiedMessage = 'Error al copiar';
      });
  }

  copyToClipboardAndSendToWhatsApp() {
    const whatsappMessage = encodeURIComponent(this.whatsAppBody);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

    navigator.clipboard.writeText(this.whatsAppBody)
      .then(() => {
        this.snackBar.open('Mensaje copiado al portapapeles!', 'Cerrar', {
          duration: 3000,
        });
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al copiar: ', err);
        this.copiedMessage = 'Error al copiar';
      });
  }
}