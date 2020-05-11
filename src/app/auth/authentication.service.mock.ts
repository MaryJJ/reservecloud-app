import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';
import { Account } from '../@core/models/account';

export class MockAuthenticationService {
  login(context: LoginContext): Observable<Account> {
    return of({
      id: 1,
      birthDate: new Date(),
      fullName: 'string',
      identity: 'string',
      genderId: 1,
      gender: 'string',
      email: 'string',
      phone: 'string',
      statusId: 1,
      status: 'string',
      avatar: 'string',
      avatarMimeType: 'string',
    });
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
