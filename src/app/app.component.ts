import {Component} from '@angular/core';
import {AuthService} from "./core/service/auth.service";
import {MENU} from "./core/constant/MENU";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'south-purity-front';
  menus = MENU;
  profile = {
    type: this.authService.getProfile()?.role
  }

  constructor(public authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }

  filterByRole(menus: any[]): any {
    return menus.filter(menu => menu.role.indexOf(this.authService.getProfile()?.role) !== -1);
  }
}
