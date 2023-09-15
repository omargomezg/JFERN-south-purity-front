import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RegisterModel} from "../model";
import {UserInterface} from "../model/user.interface";

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
  private statusSession = new BehaviorSubject<boolean>(false);
  public statusSession$ = this.statusSession.asObservable();

  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.isLogged();
  }

  authorization(email: string | undefined | null, password: string | undefined | null): Observable<AuthorizationModel> {
    return this.httpClient.post<AuthorizationModel>(`${environment.apiUrl}/auth/token`, {email, password});
  }

  getProfile(): ProfileModel | null {
    let profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) as ProfileModel : null;
  }

  isLogged(): boolean {
    this.statusSession.next(!!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  logout(goToLogin: boolean = false): void {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.statusSession.next(false);
    if (goToLogin) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  register(register: RegisterModel): Observable<any> {
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
