import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceModel} from '../model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  constructor(private httpClient: HttpClient) {
  }

  getPlaces(): Observable<PlaceModel[]> {
    return this.httpClient.get<PlaceModel[]>(`${environment.apiUrl}/public/place`);
  }
}
