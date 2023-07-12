import { Component } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  clientName?: string;
  isAuthenticated?: boolean;

  constructor(private router: Router, public authService: AuthService) {
    this.checkSession();
  }

  checkSession(): void {
    this.isAuthenticated = this.authService.isLogged()
    if (this.isAuthenticated) {
      this.clientName = this.authService.getProfile()?.fullName as string;
    }
  }

  action(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
    let role = this.authService.getProfile()?.role;
    if (role == 'CUSTOMER') {
      this.router.navigate(['/hacer-pedido']);
    } else if (role == 'ADMINISTRATOR') {
      this.router.navigate(['/dashboard']);
    }
  }
}
