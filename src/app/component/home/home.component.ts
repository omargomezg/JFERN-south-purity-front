import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, MatTooltip],
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
