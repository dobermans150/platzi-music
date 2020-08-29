import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  atists = [{}, {}, {}, {}, {}, {}, {}, {}];
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    speed: 400,
    center: true,
    scrollbar: false
  };
  constructor() {}
}
