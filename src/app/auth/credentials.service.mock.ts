import { Credentials } from './credentials.service';

export class MockCredentialsService {
  credentials: Credentials | null = {
    username: 'me',
    token: '123',
    refreshToken: '123',
    id: 1,
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  // tslint:disable-next-line: variable-name
  setCredentials(credentials?: Credentials, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
