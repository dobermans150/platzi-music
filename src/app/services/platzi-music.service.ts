import { Injectable } from '@angular/core';
import * as dataArtists from './json/artist.json';
@Injectable({
  providedIn: 'root',
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases(): any {
    return new Promise((resolve, reject) => {
      try {
        return resolve(dataArtists.items);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
