import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../model/user.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getById(clientId: string): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`${environment.apiUrl}/user/${clientId}`);
  }

  update(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.put<UserInterface>(`${environment.apiUrl}/user/${user.id}`, user);
  }

  updatePlace(clientId: string, placeId: string): Observable<UserInterface> {
    return this.httpClient.put<UserInterface>(`${environment.apiUrl}/user/${clientId}/place/${placeId}`, {});
  }

}
