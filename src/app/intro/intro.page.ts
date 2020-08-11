import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
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
  /* Injectamos el Router en nuestro componente para controlar las rutas */
  /* Injectamos el modulo de Storage para poder almacenar nuestras variables en cualquier dispositivo. */
  constructor(private router: Router, private storage: Storage) { }

  /* Funcion para cerrar las pestañas de intro */
  finish(){
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
