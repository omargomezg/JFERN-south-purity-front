import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./interface/place.interface";
import {UserInterface} from "./interface/user.interface";
import {ConfigurationInterface} from "./interface/configuration.interface";
import {OrderInterface} from "./interface/order.interface";

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

  getConfiguration(): Observable<ConfigurationInterface> {
    return this.httpClient.get<ConfigurationInterface>(`${environment.apiUrl}/administrator/configuration`);
  }

  putConfiguration(configuration: ConfigurationInterface): Observable<ConfigurationInterface> {
    return this.httpClient.put<ConfigurationInterface>(`${environment.apiUrl}/administrator/configuration`, configuration);
  }

  postOrder(order: OrderInterface): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/administrator/order`, order);
  }

  getUserById(id: string){
    return this.httpClient.get<UserInterface>(`${environment.apiUrl}/administrator/user/${id}`);
  }

  putUser(user: any): Observable<void>{
    return this.httpClient.put<void>(`${environment.apiUrl}/administrator/user/${user.id}`, user);
  }

}
