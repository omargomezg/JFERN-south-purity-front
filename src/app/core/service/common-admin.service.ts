import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PageInterface, PaginationModel, PlaceInterface, ProductInterface, UserFilterModel} from "../model";
import {UserInterface} from "../model/user.interface";
import {ConfigurationInterface} from "../model/configuration.interface";

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
        return this.httpClient.get<ConfigurationInterface>(`${environment.apiUrl}/configuration`);
    }

    putConfiguration(configuration: ConfigurationInterface): Observable<ConfigurationInterface> {
        return this.httpClient.put<ConfigurationInterface>(`${environment.apiUrl}/configuration`, configuration);
    }

    getOrders(placeId: string, status: string, pagination: PaginationModel): Observable<PageInterface<ProductInterface>> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page", pagination.pageIndex);
        queryParams = queryParams.append("size", pagination.pageSize);
        queryParams = queryParams.append("placeId", placeId);
        if (status !== '') {
            queryParams = queryParams.append("status", status);
        }
        return this.httpClient.get<PageInterface<ProductInterface>>(`${environment.apiUrl}/order`, {params: queryParams});
    }

    postProduct(order: ProductInterface): Observable<any> {
        return this.httpClient.post(`${environment.apiUrl}/administrator/product`, order);
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

    getUsers(filter: UserFilterModel, pagination: PaginationModel): Observable<PageInterface<UserInterface>> {
        // @ts-ignore
        let queryParams = new HttpParams({fromObject: filter});
        queryParams = queryParams.append("page", pagination.pageIndex);
        queryParams = queryParams.append("size", pagination.pageSize);
        return this.httpClient.get<PageInterface<UserInterface>>(`${environment.apiUrl}/user`, {params: queryParams});
    }

    getnetProcessPending(): Observable<void> {
        return this.httpClient.patch<void>(`${environment.apiUrl}/payment`, null);
    }

}
