import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import { CommuneInterface } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly jsonData: string = 'assets/communes.json';

  constructor(private readonly http: HttpClient) {
  }

  getComunas(): Observable<CommuneInterface[]> {
    return this.http.get<CommuneInterface[]>(this.jsonData);
  }

}
