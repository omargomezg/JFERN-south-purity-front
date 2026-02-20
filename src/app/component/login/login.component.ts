import {afterNextRender, Component, inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from "../../core/service";
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LoginModel} from "../../core/model";
import {MatDialog} from '@angular/material/dialog';
import {RestorePasswordComponent} from '../restore-password/restore-password.component';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'], standalone: false
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private matDialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    rememberMe: false
  });
  failedLogin = false;

  constructor() {
    afterNextRender(() => {
      this.loadRememberedUser();
    });
  }

  private loadRememberedUser(): void {
    const remember = localStorage.getItem('remember');
    if (remember) {
      try {
        const loginModel: LoginModel = JSON.parse(atob(remember));
        this.loginForm.patchValue(loginModel);
      } catch (e) {
        console.error("Error recuperando sesión", e);
      }
    }
  }

  onSubmit(): void {
    let login = this.loginForm.value as LoginModel;
    if (login.rememberMe) {
      this.setRememberMe(login);
    }
    this.authService.authorization(login.email, login.password).subscribe(tokenResult => {
      localStorage.setItem('profile', JSON.stringify(tokenResult.profile));
      localStorage.setItem('token', tokenResult.token);
      this.authService.isLogged();
      this.redirectToProfileHome(tokenResult.profile.role);
    }, error => {
      this.failedLogin = true;
    });
  }

  redirectToProfileHome(role: string): void {
    const isBrowser = isPlatformBrowser(this.platformId);

    const routes: Record<string, string> = {
      'ADMINISTRATOR': '/puntos-de-venta',
      'STOCKER': '/puntos-de-venta',
      'CUSTOMER': isBrowser && sessionStorage.getItem('cart') ? '/hacer-pedido' : '/mis-pedidos'
    };

    this.router.navigate([routes[role] || '/']);
  }

  setRememberMe(login: LoginModel): void {
    localStorage.setItem('remember', btoa(JSON.stringify(login)));
  }

  restorePassword(): void {
    const dialogRef = this.matDialog.open(RestorePasswordComponent, {width: '450px'});
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.status) {
        this.router.navigate([`/reset-password/${result.email}`]);
      }
    });
  }
}
