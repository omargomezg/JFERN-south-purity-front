import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { SectionAdvantagesComponent } from 'src/app/core/component/section-advantages/section-advantages.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ContactComponent, SectionAdvantagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = [];
  config: any;

  constructor(private router: Router) {
  }

  buy() {
    this.router.navigateByUrl('hacer-pedido');
  }
}
