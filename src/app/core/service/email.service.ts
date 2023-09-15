import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) {
  }

  sendTestEmail(email: string) {
    return this.httpClient.post(`${environment.apiUrl}/email?email=${email}`, {});
  }

}
