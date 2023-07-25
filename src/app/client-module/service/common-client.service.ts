import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlaceInterface} from "./model/place.interface";
import {CartModel, DrumRequestModel, MyOrderInterface, PaymentResponseModel} from "./model";
import {PaginationModel} from "../../core/model";

@Injectable({
  providedIn: 'root'
})
export class CommonClientService {
  constructor(private httpClient: HttpClient) {
  }

  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place`);
  }

  addPlace(place: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/customer/place`, place);
  }

  createSaleOrder(cart: CartModel): Observable<PaymentResponseModel> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("address", cart.place);
    return this.httpClient.post<PaymentResponseModel>(`${environment.apiUrl}/payment`, cart, {params: queryParams});
  }

  getStatusSaleOrder(orderId: string): Observable<PaymentResponseModel> {
    return this.httpClient.get<PaymentResponseModel>(`${environment.apiUrl}/payment/status/${orderId}`);
  }

  getMyPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place/customer`);
  }

  getOrders(id: string): Observable<MyOrderInterface[]> {
    let queryParams = new HttpParams();
    if(id) {
      queryParams = queryParams.append("id", id);
    }
    return this.httpClient.get<MyOrderInterface[]>(`${environment.apiUrl}/payment/`);
  }

  getWaterDrumsAvailable(place: string): Observable<DrumRequestModel> {
    return this.httpClient.get<DrumRequestModel>(`${environment.apiUrl}/public/water-drums/${place}/available`)
  }

  getPrice(): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/customer/water-drums/price`);
  }

  getSaleOrder(user: string, pagination: PaginationModel): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", user);
    queryParams = queryParams.append("page", pagination.pageIndex);
    queryParams = queryParams.append("size", pagination.pageSize);
    return this.httpClient.get(`${environment.apiUrl}/sale-order`, {params: queryParams});
  }

}
