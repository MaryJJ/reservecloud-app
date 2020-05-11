import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../logger.service';
import { Router } from '@angular/router';
import { CredentialsService } from '../../auth/credentials.service';
import { environment } from 'src/environments/environment';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error, request)));
  }

  // Customize the default error handler here if needed
  private errorHandler(
    response: HttpEvent<any>,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    if (response instanceof HttpErrorResponse) {
      if (!request.url.includes('login') && response.status === 401) {
        log.debug('Not authenticated error, redirecting...');
        this.credentialsService.setCredentials();
        this.router.navigate(['/login']);
      }
    }
    throw response;
  }
}
