import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  atists: any[] = [];
  songs: any[] = [];
  albums: any[] = [];

  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    speed: 400,
    center: true,
    scrollbar: false,
  };
  constructor(private musicService: PlatziMusicService) {}

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
}
