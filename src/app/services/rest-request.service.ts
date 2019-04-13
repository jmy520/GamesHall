import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestConfig } from 'src/common/config/RestConfig';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {
  /** base url */
  private BASE_URL: string = RestConfig.BASE_URL;

  /** default port */
  private PORT: string = RestConfig.DEFAULT_PORT;

  /** header options */
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient) { }

  /** get method */
  get(request: any, coverBaseUrl?: string, coverPort?: string): Observable<any> {
    const mBaseUrl = coverBaseUrl ? coverBaseUrl : this.BASE_URL;
    const mPort = coverPort ? coverPort : this.PORT;

    return this.http.get(mBaseUrl + ":" + mPort + request.url, { headers: this.headers, params: request.params });
  }

  /** post method */
  post(request: any, coverBaseUrl?: string, coverPort?: string): Observable<any> {
    const mBaseUrl = coverBaseUrl ? coverBaseUrl : this.BASE_URL;
    const mPort = coverPort ? coverPort : this.PORT;

    return this.http.post(mBaseUrl + ":" + mPort + request.url, request.params, { headers: this.headers });
  }
}
