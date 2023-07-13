import {Component, Input} from '@angular/core';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent {

  @Input() source?: string;
  name?: string;
  role?: string;

  constructor(private authService: AuthService) {
    this.name = this.authService.getProfile()?.fullName;
    this.role = this.authService.getProfile()?.role;
  }

  logout(): void {
    this.authService.logout();
  }
}
