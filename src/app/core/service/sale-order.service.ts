import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PaginationModel} from "../model";

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  constructor(private httpClient: HttpClient) {
  }

  get(pagination: PaginationModel): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", pagination.pageIndex);
    queryParams = queryParams.append("size", pagination.pageSize);
    return this.httpClient.get<any>(`${environment.apiUrl}/sale-order`, {params: queryParams});
  }
}
