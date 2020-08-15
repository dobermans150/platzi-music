import { Injectable } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor() {}

  loginUser(credentials) {
    const { email, password } = credentials;

    return new Promise((accept, reject) => {
      if (email === 'test@test.com' && password === '12345') {
        accept('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }
}
