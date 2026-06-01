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
*Aguas Pureza del Sur*
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
    const emailAddress = 'purezadelsur@gmail.com';
    navigator.clipboard
      .writeText(emailAddress)
      .then(() => {
        this.snackBar.open('¡Correo copiado al portapapeles!', 'Cerrar', {
          duration: 3000,
        });
        setTimeout(() => {
          window.open(
            `mailto:${emailAddress}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`,
            '_blank',
          );
        }, 3000);
      })
      .catch((err) => {
        console.error('Error al copiar: ', err);
        this.copiedMessage = 'Error al copiar';
      });
  }

  copyToClipboardAndSendToWhatsApp() {
    const phoneNumber = '56984428760'; // WhatsApp number without '+'
    const whatsappMessage = encodeURIComponent(this.whatsAppBody);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    navigator.clipboard
      .writeText(whatsappUrl) // Copy the full WhatsApp URL to clipboard
      .then(() => {
        this.snackBar.open(
          'Enlace de WhatsApp copiado al portapapeles!',
          'Cerrar',
          {
            duration: 3000,
          },
        );
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
