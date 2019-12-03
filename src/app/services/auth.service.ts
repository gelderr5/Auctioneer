import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) { }

  public authenticate(email: string, password: string) {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser.getIdToken().then(
            token => this.token = token
          );
          return response;
        }
      )
      .catch(
        error => {
          throw new Error(error.message);
        }
      );
  }

  isAuthenticated() {
    return firebase.auth().currentUser != null;
  }

  public async logout() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  }

  public getToken(): string {
    if (!firebase.auth().currentUser) {
      return null;
    }

    firebase.auth().currentUser.getIdToken().then(
      token => this.token = token
    );

    return this.token;
  }

  getUserName() {
    return firebase.auth().currentUser.email;
  }
}
