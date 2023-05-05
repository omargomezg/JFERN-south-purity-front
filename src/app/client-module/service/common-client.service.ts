import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./model/place.interface";
import {MyOrderInterface} from "./model/my-order.interface";
import {AddPlaceRequestModel} from "./model/add-place-request.model";

@Injectable({
  providedIn: 'root'
})
export class CommonClientService {
  constructor(private httpClient: HttpClient) { }

  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place`);
  }

  addPlace(place: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/customer/place`, place);
  }

  getMyPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place/customer`);
  }

  getOrders(): Observable<MyOrderInterface[]>{
    return this.httpClient.get<MyOrderInterface[]>(`${environment.apiUrl}/customer/order`);
  }

}
