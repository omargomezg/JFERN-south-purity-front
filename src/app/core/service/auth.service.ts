import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

interface AuthorizationModel {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authorization(email: string | undefined | null, password: string | undefined | null): Observable<AuthorizationModel> {
    return this.httpClient.post<AuthorizationModel>(`${environment.apiUrl}/auth/token`, {email, password});
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

}
