import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./interface/place.interface";
import {UserInterface} from "./interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class CommonAdminService {

  constructor(private httpClient: HttpClient) { }


  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/administrator/place`);
  }

  postPlace(place: PlaceInterface): Observable<PlaceInterface> {
    return this.httpClient.post<PlaceInterface>(`${environment.apiUrl}/administrator/place`, place);
  }

  getUsers(role: string = 'CUSTOMER'): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(`${environment.apiUrl}/administrator/user?role=${role}`);
  }

}