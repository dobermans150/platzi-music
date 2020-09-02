import { Injectable } from '@angular/core';
import * as dataArtists from './json/artist.json';
import * as dataTopTrack from './json/topTracks.json';
import * as dataSongs from './json/songs.json';


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

  getArtistTopTracks(artistId){
    return dataTopTrack.items.filter((track) => track.id === artistId);
  }

  getSongs(): any {
    return new Promise((resolve, reject) => {
      try {
        return resolve(dataSongs.songs);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
