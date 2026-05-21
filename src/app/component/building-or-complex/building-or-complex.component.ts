import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnInit, signal } from '@angular/core';


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
  private emailSubject = "Hola, podemos contratar agua purificada en mi comunidad";
  private emailBody = "Puedes revisar el sitio www.purezadelsur.cl y contratar el servicio sin costo!"

   ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 767px)']).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }

  copyToClipboardAndSendToEmail() {
    const emailAddress = 'contacto@example.com'; // Reemplazar con el email de contacto real
    navigator.clipboard.writeText(emailAddress).then(() => {
      this.copiedMessage = 'Copiado al portapapeles!';
      setTimeout(() => {
        this.copiedMessage = '';
        // Abrir cliente de correo predeterminado con subject
        window.open(`mailto:?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`, '_blank');
      }, 3000); // Mostrar mensaje por 3 segundos
    }).catch(err => {
      console.error('Error al copiar: ', err);
      this.copiedMessage = 'Error al copiar';
    });
  }

  copyToClipboardAndSendToWhatsApp() {
    const link = '+56984428760';
    navigator.clipboard.writeText(link).then(() => {
      this.copiedMessage = 'Copiado al portapapeles!';
      setTimeout(() => {
        this.copiedMessage = '';
        // open new whatsapp window after message disappears
        window.open(`https://wa.me`, '_blank');
      }, 3000); // Hide message after 3 seconds
    }).catch(err => {
      console.error('Error al copiar: ', err);
      this.copiedMessage = 'Error al copiar';
    });
  }
}
