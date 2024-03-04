import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/service";
import {MENU} from "./core/constant/MENU";
import {NgxGa4Service} from "@kattoshi/ngx-ga4";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'south-purity-front';
    menus = MENU;
    profile = {
        type: this.authService.getProfile()?.role
    }

    constructor(public authService: AuthService, private ngxGa4Service: NgxGa4Service) {
    }

    logout(): void {
        this.authService.logout();
    }

    filterByRole(menus: any[]): any {
        return menus.filter(menu => menu.role.indexOf(this.authService.getProfile()?.role) !== -1);
    }

    async ngOnInit(): Promise<void> {
        await this.ngxGa4Service.install$('G-FVKGFK1ZQD');
        this.ngxGa4Service.js();
        this.ngxGa4Service.config();
    }
}
