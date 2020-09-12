import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(
    private menu: MenuController,
    private navCtlr: NavController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  async closeMenu() {
    try {
      await this.menu.close();
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.storage.remove('isUserLoggedIn');
      await this.navCtlr.navigateRoot('/login');
    } catch (error) {
      console.log(error);
    }
  }

  goToSettings() {
    this.navCtlr.navigateRoot('menu/settings');
    this.menu.close();
  }

  goToHome() {
    this.navCtlr.navigateRoot('menu/home');
    this.menu.close();
  }

  goToSports() {
    this.navCtlr.navigateRoot('menu/sports');
    this.menu.close();
  }
}
