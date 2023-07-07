import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceInterface} from '../model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  constructor(private httpClient: HttpClient) {
  }

  getPlaces(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/public/place`);
  }
}
