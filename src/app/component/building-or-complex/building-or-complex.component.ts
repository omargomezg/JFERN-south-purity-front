import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-building-or-complex',
  imports: [CommonModule],
  templateUrl: './building-or-complex.component.html',
  styleUrl: './building-or-complex.component.scss'
})
export class BuildingOrComplexComponent {
  copiedMessage: string = '';

  copyToClipboard() {
    const link = '+56984428760';
    navigator.clipboard.writeText(link).then(() => {
      this.copiedMessage = 'Copiado al portapapeles';
      setTimeout(() => {
        this.copiedMessage = '';
        // open new whatsapp window after message disappears
        window.open(`https://wa.me/${link}`, '_blank');
      }, 3000); // Hide message after 3 seconds
    }).catch(err => {
      console.error('Error al copiar: ', err);
      this.copiedMessage = 'Error al copiar';
    });
  }
}
