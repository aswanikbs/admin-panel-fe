import { Injectable } from '@angular/core';
import { BaseService } from '../core/services/base.service';
import { Endpoints } from '../core/endpoints';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;

  constructor(
    public http: HttpClient
  ) {
    super(http);
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value ? this.currentUserSubject.value : null;
  }

  /**
   * Login user using using email & pwd
   * @param credentials user credentials
   */
  loginUser(credentials): Observable<object> {
    return this.http.post(environment.base_url + Endpoints.LOGIN, credentials).pipe(map(user => {
      if (user) {
        console.log(user);
        // store user details and access token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user as LoginResponse);
      }
      return user;
    }));
  }
}
