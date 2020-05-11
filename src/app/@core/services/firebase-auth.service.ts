import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Logger } from '../logger.service';

const log = new Logger('Firebase authentication service');
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private afAuth: AngularFireAuth) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: firebase.auth.AuthProvider): Promise<any> {
    const result = await this.afAuth.signInWithPopup(provider);
    const idToken = (await (await this.afAuth.currentUser).getIdTokenResult())
      .token;
    return {
      data: result,
      idToken,
    };
  }
}
