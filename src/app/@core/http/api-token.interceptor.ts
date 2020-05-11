import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../auth/authentication.service';
import { Credentials } from '../../auth/credentials.service';
import { Constants } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap, filter, take, finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  constructor(
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf(environment.serverUrl)) {
      return next.handle(request);
    }
    if (request.url.includes('refresh-token')) {
      return next.handle(request);
    }
    let savedCredentials = null;
    if (isPlatformBrowser(this.platformId)) {
      savedCredentials =
        sessionStorage.getItem(Constants.CREDENTIALS_KEY) ||
        localStorage.getItem(Constants.CREDENTIALS_KEY);
    }
    if (!savedCredentials) {
      return next.handle(request);
    }
    const credentials = JSON.parse(savedCredentials);
    const accessExpired = this.isAccessTokenExpired(credentials);
    if (accessExpired) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authService
          .refreshToken(
            credentials.refreshToken,
            credentials.token,
            credentials,
            true
          )
          .pipe(
            switchMap((authResponse) => {
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(authResponse);
              return next.handle(this.injectToken(request, credentials));
            }),
            finalize(() => {
              this.refreshTokenInProgress = false;
            })
          );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((result) => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.injectToken(request, credentials));
          })
        );
      }
    }

    if (!accessExpired) {
      return next.handle(this.injectToken(request, credentials));
    }
  }

  private injectToken(request: HttpRequest<any>, credentials: Credentials) {
    const token = credentials.token;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  private isAccessTokenExpired(credentials: Credentials) {
    const token = credentials.token;
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}
