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

  private emailBodyHTML = `
<div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
  <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">
    <span style="font-size: 20px;">💧</span> Abastecimiento de agua purificada para edificios y condominios.
  </p>
  
  <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">
    <span style="font-size: 20px;">💡</span> Instalación gratuita, rápida y no invasiva.
  </p>
  
  <p style="margin: 0 0 15px 0; font-size: 14px; color: #555;">
    Implementación de racks a nivel comunitario, orientada a la comodidad de los residentes.
  </p>
  
  <p style="margin: 0 0 15px 0; font-size: 14px;">
    Información y contacto directo con la empresa:<br>
    <a href="https://purezadelsur.cl/informacion-para-administracion" style="color: #2196F3; text-decoration: none;">https://purezadelsur.cl/informacion-para-administracion</a>
  </p>
  
  <p style="margin: 0; font-size: 14px;">
    +56 9 8442 8760<br>
    <strong>Aguas Pureza del Sur</strong><br>
    <span style="color: #666;">Calidad Valdiviana</span>
  </p>
</div>
`;
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
    navigator.clipboard
      .writeText(this.emailBodyHTML)
      .then(() => {
        this.snackBar.open('¡Correo formateado copiado al portapapeles!', 'Cerrar', {
          duration: 2000,
        });
        setTimeout(() => {
          window.open(
            `mailto:?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBodyHTML)}`,
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
    const whatsappMessage = encodeURIComponent(this.whatsAppBody);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

    navigator.clipboard
      .writeText(whatsappUrl)
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
