import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./interface/place.interface";
import {UserInterface} from "./interface/user.interface";
import {ConfigurationInterface} from "./interface/configuration.interface";
import {OrderInterface} from "./interface/order.interface";
import {PageInterface} from "./interface/page.interface";
import {PaginationModel} from "./interface/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class CommonAdminService {

  constructor(private httpClient: HttpClient) {
  }


  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place`);
  }

  postPlace(place: PlaceInterface): Observable<PlaceInterface> {
    return this.httpClient.post<PlaceInterface>(`${environment.apiUrl}/administrator/place`, place);
  }

  getConfiguration(): Observable<ConfigurationInterface> {
    return this.httpClient.get<ConfigurationInterface>(`${environment.apiUrl}/administrator/configuration`);
  }

  putConfiguration(configuration: ConfigurationInterface): Observable<ConfigurationInterface> {
    return this.httpClient.put<ConfigurationInterface>(`${environment.apiUrl}/administrator/configuration`, configuration);
  }

  getOrders(placeId: string): Observable<PageInterface<OrderInterface>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("place", placeId);
    return this.httpClient.get<PageInterface<OrderInterface>>(`${environment.apiUrl}/order`, {params: queryParams});
  }

  postOrder(order: OrderInterface): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/administrator/order`, order);
  }

  getUserById(id: string) {
    return this.httpClient.get<UserInterface>(`${environment.apiUrl}/user/${id}`);
  }

  putUser(user: any): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/administrator/user/${user.id}`, user);
  }

  postUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user`, user);
  }

  getUsers(role: string | undefined, pagination: PaginationModel): Observable<PageInterface<UserInterface>> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", pagination.page);
    queryParams = queryParams.append("size", pagination.size);
    if (role) {
      queryParams = queryParams.append("role", role);
    }
    return this.httpClient.get<PageInterface<UserInterface>>(`${environment.apiUrl}/user`, {params: queryParams});
  }

}
