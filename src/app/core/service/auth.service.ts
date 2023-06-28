import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RegisterModel} from "../model";

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

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  authorization(email: string | undefined | null, password: string | undefined | null): Observable<AuthorizationModel> {
    return this.httpClient.post<AuthorizationModel>(`${environment.apiUrl}/auth/token`, {email, password});
  }

  getProfile(): ProfileModel | null {
    let profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) as ProfileModel : null;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.router.navigate(['/login'])
  }

  register(register: RegisterModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/register`, register);
  }

  getMyProfile(): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/profile`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/profile`, profile);
  }

  updatePassword(profile: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/user/${profile.id}/password`, profile);
  }


}
