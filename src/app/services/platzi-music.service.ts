import { Injectable } from '@angular/core';
import * as dataArtists from './json/artist.json';
import * as dataTopTrack from './json/topTracks.json';
import * as dataSongs from './json/songs.json';
import { environment } from 'src/environments/environment';

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

  getArtistTopTracks(artistId) {
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

  /* Spotify API */

  private async getToken() {
    const { clientId, clientSecret } = environment.spotify;

    try {
      const clientEncode = await btoa(`${clientId}:${clientSecret}`);
      const myHeaders = new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${clientEncode}`,
      });

      const myBody = new URLSearchParams({ grant_type: 'client_credentials' });
      const miInit = {
        method: 'POST',
        headers: myHeaders,
        body: myBody,
        /* mode: 'cors', */
      };

      const response = await fetch(
        'https://accounts.spotify.com/api/token',
        miInit
      );
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpotifyNewReleases() {
    try {
      const auth = await this.getToken();
      const { access_token, token_type } = auth;
      const myHeaders = new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `${token_type} ${access_token}`,
      });

      const miInit = {
        method: 'GET',
        headers: myHeaders,
        /* body: myBody, */
        /* mode: 'cors', */
      };

      const newReleases = await fetch(
        'https://api.spotify.com/v1/browse/new-releases',
        miInit
      );

      const newReleasesJson = await newReleases.json();
      console.log(newReleasesJson.albums.items);

      return newReleasesJson.albums.items;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpotifyArtistTopTracks(artistId) {
    try {
      const auth = await this.getToken();
      const { access_token, token_type } = auth;
      const myHeaders = new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `${token_type} ${access_token}`,
      });
      const miInit = {
        method: 'GET',
        headers: myHeaders,
        /* body: myBody, */
        /* mode: 'cors', */
      };

      const topTracks = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=EC`,
        miInit
      );

      const topTracksJson = await topTracks.json();

      return topTracksJson.tracks;
    } catch (error) {
      console.log(error);
    }
  }
}
