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
  song = {};

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
        this.songs = response.filter((e) => e.type === 'single');
        this.albums = response.filter((e) => e.type === 'album');
        console.log(this.albums, this.songs);
      })
      .catch((error) => console.log(error));
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs[0].tracks,
        artist: artist.name,
      },
    });

    console.log(songs[0].tracks);

    modal
      .onDidDismiss()
      .then((dataReturn) => {
        this.song = dataReturn.data;
      })
      .catch((error) => console.log(error));

    return await modal.present();
  }

  play() {
    this.song.playing = true;
  }

  pause() {
    this.song.playing = false;
  }
}
