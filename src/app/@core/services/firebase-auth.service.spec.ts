import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './firebase-auth.service';
import { AngularFireModule } from '@angular/fire';

describe('FirebaseAuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AngularFireModule],
      providers: [{ provide: FirebaseAuthService, useValue: {} }]
    })
  );

  it('should be created', () => {
    const service: FirebaseAuthService = TestBed.get(FirebaseAuthService);
    expect(service).toBeTruthy();
  });
});
