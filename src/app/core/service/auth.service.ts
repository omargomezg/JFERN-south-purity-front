import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RegisterModel} from "../model";

interface AuthorizationModel {
  token: string;
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

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  register(register: RegisterModel): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/register`, register);
  }


}
