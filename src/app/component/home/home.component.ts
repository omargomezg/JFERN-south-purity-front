import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SectionAdvantagesComponent } from 'src/app/core/component/section-advantages/section-advantages.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgOptimizedImage, SectionAdvantagesComponent, RouterLink],
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
