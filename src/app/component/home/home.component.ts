import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
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
