import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
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
