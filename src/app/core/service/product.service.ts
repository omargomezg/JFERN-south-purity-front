import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductModel} from "../model/product.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PageInterface} from "../model";
import {ProductFilterModel} from "../model/product-filter.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  get(filter: ProductFilterModel): Observable<PageInterface<ProductModel>> {
    // @ts-ignore
    let queryParams = new HttpParams({fromObject: filter});
    return this.httpClient.get<PageInterface<ProductModel>>(`${environment.apiUrl}/product`);
  }
}
