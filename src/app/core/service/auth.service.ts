import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { RegisterModel } from "../model";
import { UserInterface } from "../model/user.interface";
import { SocialUser } from '@abacritt/angularx-social-login';

interface AuthorizationModel {
  token: string;
  profile: ProfileModel
}

interface ProfileModel {
  id: string;
  rut: string;
  fullName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly statusSession = new BehaviorSubject<boolean>(false);
  public statusSession$ = this.statusSession.asObservable();

  constructor(private readonly httpClient: HttpClient,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLogged();
    }
  }

  authorization(email: string | undefined | null, password: string | undefined | null): Observable<AuthorizationModel> {
    return this.httpClient.post<AuthorizationModel>(`${environment.apiUrl}/auth/token`, { email, password });
  }

  getProfile(): ProfileModel | null {
    if (isPlatformBrowser(this.platformId)) {
      let profile = localStorage.getItem('profile');
      return profile ? JSON.parse(profile) as ProfileModel : null;
    }
    return null;
  }

  authorizationGoogle(user: SocialUser): Observable<AuthorizationModel> {
    return this.httpClient.post<AuthorizationModel>(`${environment.apiUrl}/auth/google`, user);
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = !!localStorage.getItem('token');
      this.statusSession.next(token);
      return token;
    }
    return false;
  }

  logout(goToLogin: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    }
    this.statusSession.next(false);
    if (goToLogin) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  register(register: RegisterModel): Observable<any> {
    let rut = register.rut.replace(/\.|-/g, '');
    if (rut.length > 1) {
      rut = rut.slice(0, -1) + '-' + rut.slice(-1);
    }
    if (rut.charAt(rut.length - 1).toLowerCase() === 'k') {
      rut = rut.slice(0, -1) + 'K';
    }
    register.rut = rut;
    return this.httpClient.post<any>(`${environment.apiUrl}/register`, register);
  }

  getMyProfile(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/profile`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/profile`, profile);
  }

  restoreAccount(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${environment.apiUrl}/auth/restore`, user);
  }

  restoreAccountWithCode(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${environment.apiUrl}/auth/restore/${user.passwordReset.code}`, user);
  }

  updatePassword(profile: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/user/${profile.id}/password`, profile);
  }


}
