import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  /* Con este Guard validamos si nuestro usuario accedio al tutorial o no */
  async canActivate() {
    const IntroShowed = await this.storage.get('isIntroShowed');

    if (IntroShowed) {
      return true;
    } else {
      this.router.navigateByUrl('/intro');
    }
  }
}
