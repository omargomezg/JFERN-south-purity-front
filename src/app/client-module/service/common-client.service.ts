import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./interface/place.interface";
import {MyOrderInterface} from "./interface/my-order.interface";

@Injectable({
  providedIn: 'root'
})
export class CommonClientService {
  constructor(private httpClient: HttpClient) { }

  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place`);
  }

  getOrders(): Observable<MyOrderInterface[]>{
    return this.httpClient.get<MyOrderInterface[]>(`${environment.apiUrl}/customer/order`);
  }

}
