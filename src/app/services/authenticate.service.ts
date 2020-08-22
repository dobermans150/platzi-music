import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private storage: Storage) {}

  async loginUser(credentials) {
    const { email, password } = credentials;
    const userStorage = await this.storage.get('user');

    return new Promise((accept, reject) => {
      if (
        (email === 'test@test.com' && password === '12345') ||
        (email === userStorage.email && password === userStorage.password)
      ) {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }

  async registerUser(userData) {
    try {
      userData.password = btoa(userData.password);
      const response = await this.storage.set('user', userData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
