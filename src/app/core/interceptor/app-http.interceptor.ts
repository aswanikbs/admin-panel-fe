import { Router } from '@angular/router';
import { Injectable, ErrorHandler } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { AuthService } from "../../auth/auth.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandler,
    private router: Router
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with access token if available
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.id) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.id}`,
          Accept: "application/*"
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError(response => {
        console.log("Error in interceptor:", response.statusText);

        const urlPath = this.router.url.split('?');
        if (urlPath[0] !== "/login") {
          if (response.status === 401) {
            //handle authorization errors
            if (this.router.url !== '/') {
              this.router.navigate([''], { queryParams: { returnUrl: this.router.url } });
            }
          }
        }

        if (response instanceof HttpErrorResponse) {
          this.errorHandler.handleError(response);
        }
        return throwError(response);
      })
    );
  }


}
