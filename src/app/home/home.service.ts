import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { Endpoints } from '../core/endpoints';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getUsers(): Observable<object> {
    return this.http.get(environment.base_url + Endpoints.GET_USERS);
  }

  addUser(user): Observable<object> {
    return this.http.post(environment.base_url + Endpoints.ADD_USER, user);
  }
}
