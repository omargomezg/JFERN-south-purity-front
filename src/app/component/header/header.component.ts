import { Component } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  clientName?: string;
  subscription?: Subscription;
  isAuthenticated?: boolean;

  constructor(private router: Router, public authService: AuthService) {
    this.checkSession();
  }

  checkSession(): void {
    let profile = this.authService.getProfile();
    this.subscription = this.authService.statusSession$
      .subscribe((status: boolean) => this.isAuthenticated = status);
  }

  getName(): string {
    return this.authService.getProfile()?.fullName as string;
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
