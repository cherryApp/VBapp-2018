import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(loginData) {
    let user = {
      email: 'vbapp@gmail.com',
      password: 'joe_vb777'
    };

    user = loginData || user;

    return this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
