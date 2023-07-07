import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceInterface} from '../model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<PlaceInterface[]> {
    return this.httpClient.get<PlaceInterface[]>(`${environment.apiUrl}/place`);
  }
}
