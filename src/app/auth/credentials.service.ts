import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Constants } from '../@core/constants';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  refreshToken: string;
  id: number;
}

const credentialsKey = Constants.CREDENTIALS_KEY;

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  // tslint:disable-next-line: variable-name
  private _credentials: Credentials | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    let savedCredentials = null;
    if (isPlatformBrowser(this.platformId)) {
      savedCredentials =
        sessionStorage.getItem(credentialsKey) ||
        localStorage.getItem(credentialsKey);
    }
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    if (isPlatformServer(this.platformId)) {
      return true;
    } else {
      return !!this.credentials;
    }
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      if (isPlatformBrowser(this.platformId)) {
        storage.setItem(credentialsKey, JSON.stringify(credentials));
      }
    } else {
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
      }
    }
  }
}
