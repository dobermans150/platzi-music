import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 500,
  };

  slides = [
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Escucha tu música',
      subtitle: 'EN CUALQUIER LUGAR',
      description:
        'Los mejores álbunes, las mejores canciones. Escucha y comparte encualquier momento, a todas horas.',
      icon: 'play',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Disfruta de nuestro reproductor',
      subtitle: 'DE VIDEOS INCREÍBLES',
      description:
        ' Entra al modo video de nuestro reproducto y obtén acceso a clips, documentales y making offs increibles de tu artista favorito.',
      icon: 'videocam',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Accede al exclusivo',
      subtitle: 'MODO DEPORTE',
      description: `Crea una playlist basada en tu actividad física.
        Ten reportes y acceso a lo que necesites, ¡integrado con GPS!`,
      icon: 'bicycle-outline',
    },
    {
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Platzi Music Logo',
      title: 'Acede a nuestra aplicacion',
      subtitle: 'ADAPTADO PARA TI',
      description: `Y podras disfrutar de cada una de las funcionalidades que trae para ti`,
      icon: 'musical-notes-outline',
    },
  ];
  constructor() {}
}
