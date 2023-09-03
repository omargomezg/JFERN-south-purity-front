import {Component} from '@angular/core';
import {AuthService} from '../../core/service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {environment} from "../../../environments/environment";
import {MENU} from "../../core/constant/MENU";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  clientName?: string;
  subscription?: Subscription;
  isAuthenticated?: boolean;
  home = environment.home;
  menus = MENU;

  constructor(private router: Router, public authService: AuthService,
              private location: Location) {
    this.checkSession();
  }

  checkSession(): void {
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

  isMenuActive(anchor: string) {
    return this.location.path(true).includes(anchor);
  }

  protected readonly menu = MENU;

  filterByRole(menus: any[]): any {
    return menus.filter(menu => menu.role.indexOf(this.authService.getProfile()?.role) !== -1);
  }

  logout() {
    this.authService.logout();
  }
}
