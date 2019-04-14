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

  constructor(public http: HttpClient) { }

  /** serialize params */
  serialize(params: any) {
    let result = [];
    for (let key in params)
      if (params.hasOwnProperty(key)) {
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
      }
    return result.join("&");
  }

  /** get method */
  get(request: any, headers?: any, coverBaseUrl?: string, coverPort?: string): Observable<any> {
    const mBaseUrl = coverBaseUrl ? coverBaseUrl : this.BASE_URL;
    const mPort = coverPort ? coverPort : this.PORT;
    let urlParams = "";
    if (request.params) {
      urlParams = "?" + this.serialize(request.params);
    }
    const mHeaders = new HttpHeaders(headers);
    const fullUrl = mBaseUrl + ":" + mPort + request.url + urlParams;

    return headers ? this.http.get(fullUrl, { headers: mHeaders }) : this.http.get(mBaseUrl + ":" + mPort + request.url);
  }

  /** post method */
  post(request: any, headers?: any, coverBaseUrl?: string, coverPort?: string): Observable<any> {
    const mBaseUrl = coverBaseUrl ? coverBaseUrl : this.BASE_URL;
    const mPort = coverPort ? coverPort : this.PORT;
    const mHeaders = new HttpHeaders(headers);
    const fullUrl = mBaseUrl + ":" + mPort + request.url;

    return headers ? this.http.post(fullUrl, request.params, { headers: mHeaders }) : this.http.post(mBaseUrl + ":" + mPort + request.url, request.params);
  }
}
