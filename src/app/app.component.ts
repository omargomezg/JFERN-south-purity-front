import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from "./core/service";
import { MENU } from "./core/constant/MENU";
import { NgxGa4Service } from "@kattoshi/ngx-ga4";
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'south-purity-front';
  menus = MENU;
  profile = {
    type: this.authService.getProfile()?.role
  }

  constructor(public authService: AuthService, private socialAuthService: SocialAuthService,
    private router: Router,
    private ngxGa4Service: NgxGa4Service,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  logout(): void {
    this.authService.logout();
  }

  filterByRole(menus: any[]): any {
    return menus.filter(menu => menu.role.indexOf(this.authService.getProfile()?.role) !== -1);
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.ngxGa4Service.install$('G-FVKGFK1ZQD');
      this.ngxGa4Service.js();
      this.ngxGa4Service.config();
      this.socialAuthService.authState.subscribe((user: SocialUser) => {
        if (user) {
          this.authService.authorizationGoogle(user).subscribe(tokenResult => {
            localStorage.setItem('profile', JSON.stringify(tokenResult.profile));
            localStorage.setItem('token', tokenResult.token);
            this.authService.isLogged();
            this.redirectToProfileHome(tokenResult.profile.role);
          });
        }
      });
    }
  }

  redirectToProfileHome(role: string): void {
    if (role === 'ADMINISTRATOR') {
      this.router.navigate(['/puntos-de-venta']);
    } else if (role === 'CUSTOMER') {
      let cart = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('cart') : null;
      if (cart != null) {
        this.router.navigate(['/hacer-pedido']);
      } else {
        this.router.navigate(['/mis-pedidos']);
      }
    }
  }

}
