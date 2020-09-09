import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  atists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  song = { playing: false };
  currentSong = {};
  newtime;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 4,
    speed: 400,
    center: true,
    scrollbar: false,
  };
  constructor(
    private musicService: PlatziMusicService,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.musicService
      .getNewReleases()
      .then((response) => {
        /* Map apra registrar todo en la variable artist*/
        response.map((item) => (this.atists = [...this.atists, item]));
        console.log(response);

        /* Registrar todo en las variables de song y albums */
        /* this.songs = response.filter((e) => e.type === 'single');
        this.albums = response.filter((e) => e.type === 'album'); */
        console.log(this.albums, this.songs);
      })
      .catch((error) => console.log(error));

    this.musicService.getSpotifyNewReleases().then((response) => {
      this.songs = response.filter((e) => e.album_type === 'single');
      this.albums = response.filter((e) => e.album_type === 'album');
    });
  }

  /* Mirar canciones tracks de un artista */
  async showSongs(artist) {
    const songs = await this.musicService.getSpotifyArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs,
        artist: artist.name,
      },
    });

    modal
      .onDidDismiss()
      .then((dataReturn) => {
        this.song = dataReturn.data;
      })
      .catch((error) => console.log(error));

    return await modal.present();
  }

  /* Mirar canciones tracks de un albun */

  async showSongsAlbum(album) {
    try {
      const songs = await this.musicService.getAlbumTopTracks(album.id);
      const modal = await this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          songs,
          album: album.name,
        },
      });

      modal
        .onDidDismiss()
        .then((dataReturn) => {
          this.song = dataReturn.data;
        })
        .catch((error) => console.log(error));

      return await modal.present();
    } catch (error) {}
  }

  /* Funcion de play */

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newtime =
        (1 / this.currentSong.duration) * this.currentSong.currentTime;
    });
    this.song.playing = true;
  }

  /* funcion de pausa  */
  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  /* Partir el tiempo */
  parseTime(time = '0.00') {
    const partTime = parseInt(time.toString().split('.')[0], 10);
    let minutes = Math.floor(partTime / 60).toString();

    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }

    let seconds = (partTime % 60).toString();

    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  }
}
