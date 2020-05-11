import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from '../@core/constants';
import { Account } from '../@core/models/account';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Account> {
    return this.http
      .post<any>(
        Constants.LOGIN_URL,
        { email: context.username, password: context.password },
        { observe: 'response' }
      )
      .pipe(
        map((resp) => {
          // tslint:disable-next-line: variable-name
          const _credentials: Credentials = {
            username: `${resp.body.result.fullName}`,
            token: this.getToken(resp.headers.get('Authorization')),
            refreshToken: resp.headers.get('refreshtoken'),
            id: resp.body.result.id,
          };
          this.credentialsService.setCredentials(
            _credentials,
            context.remember
          );
          return resp.body.result;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<any> {
    // Customize credentials invalidation here
    return this.http.post(Constants.LOGOUT_URL, '').pipe(
      map((resp) => {
        this.credentialsService.setCredentials();
        return resp;
      })
    );
  }
  refreshToken(
    refreshToken: string,
    token: string,
    credentials: Credentials,
    remember: boolean
  ) {
    return this.http
      .post<any>(
        Constants.REFRESH_TOKEN_URL,
        { token, refreshToken },
        {
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          credentials.refreshToken = resp.headers.get('RefreshToken');
          credentials.token = this.getToken(resp.headers.get('Authorization'));
          this.credentialsService.setCredentials(credentials, remember);
          return resp.body.result;
        })
      );
  }

  loginWithSocial(data: any): Observable<Account> {
    return this.http
      .post<any>(Constants.LOGIN_SOCIAL_URL, data, { observe: 'response' })
      .pipe(
        map((resp) => {
          // tslint:disable-next-line: variable-name
          const _credentials: Credentials = {
            username: `${resp.body.result.fullName}`,
            token: this.getToken(resp.headers.get('Authorization')),
            refreshToken: resp.headers.get('refreshtoken'),
            id: resp.body.result.id,
          };
          this.credentialsService.setCredentials(_credentials, true);
          return resp.body.result;
        })
      );
  }
  private getToken(token: string) {
    // tslint:disable-next-line: variable-name
    const _token = token.split(' ');
    return _token.length > 0 ? _token[1] : null;
  }
}
