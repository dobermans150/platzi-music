import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  songs: any[];
  name: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    console.log(this.songs);
    this.name = this.navParams.data.artist
      ? this.navParams.data.artist
      : this.navParams.data.album;
  }

  async selectSong(song = {}) {
    return await this.modalController.dismiss(song);
  }
}
