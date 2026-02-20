import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-buy',
  standalone: true,
  imports: [],
  templateUrl: './button-buy.component.html',
  styleUrl: './button-buy.component.scss'
})
export class ButtonBuyComponent {
private router = inject(Router);

  constructor() { }

  buy() {
    console.log('ButtonBuy: buy() called');
    this.router.navigateByUrl('/hacer-pedido')
      .then(success => console.log('navigation success:', success))
      .catch(err => console.error('navigation error:', err));
  }

}
