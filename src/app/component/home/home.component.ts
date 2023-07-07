import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  config: any;

  constructor(private router: Router) {
  }

  addToCart(WATER_DRUM: any, recarga: string, price: any) {

  }

  buy() {
    this.router.navigateByUrl('hacer-pedido');
  }
}
