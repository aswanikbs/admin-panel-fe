import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    public http: HttpClient
  ) { }

  /**
   * Http get request
   * @param url url
   * @param parameters optional query params as json object
   */
  get(url: string, parameters?: any) {
    return this.http.get(url, parameters).pipe(map(info => {
      return info;
    }));
  }

  /**
   * http post request using http client
   * @param url - api url.
   * @param payload - api payload.
   */
  post(url: string, payload: any) {
    return this.http.post(url, payload).pipe(map(info => {
      return info;
    }));
  }
}
