import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {environment} from "../../../environments/environment";
import {MENU} from "../../core/constant/MENU";

interface IMenu {
  name: string;
  link: string;
  role: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  clientName?: string;
  subscription?: Subscription;
  isAuthenticated: boolean = false;
  home = environment.home;
  menus: IMenu[] = [];
  loading: boolean = true;

  constructor(private readonly router: Router,
              public authService: AuthService,
              private readonly location: Location) {
  }

  ngOnInit() {
    this.loading = true;
    const role = this.authService.getProfile()?.role || "";
    this.menus = MENU.filter(menu => menu.role.indexOf(role) !== -1);
    this.checkSession();
    this.loading = false;
  }

  checkSession(): void {
    this.subscription = this.authService.statusSession$
      .subscribe((status: boolean) => {
        this.isAuthenticated = status;
      });
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

  logout() {
    this.authService.logout();
  }
}
