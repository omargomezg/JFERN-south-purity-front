import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceModel} from '../model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<PlaceModel[]> {
    return this.httpClient.get<PlaceModel[]>(`${environment.apiUrl}/place`);
  }

  put(place: PlaceModel): Observable<PlaceModel[]> {
    return this.httpClient.put<PlaceModel[]>(`${environment.apiUrl}/place`, place);
  }
}
