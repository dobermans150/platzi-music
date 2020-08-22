import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validationMessage = {
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'no es un email valido' },
    ],
    password: [
      { type: 'required', message: 'El password es requerido' },
      {
        type: 'minlength',
        message: 'El password debe ser de minimo 5 caracteres',
      },
    ],
    name: [
      { type: 'required', message: 'El nombre es requerido' },
      {
        type: 'minlength',
        message: 'El nombre debe ser de minimo 8 caracteres',
      },
      {
        type: 'maxlength',
        message: 'El nombre debe ser un maximo de 16 caracteres',
      },
      { type: 'pattern', message: 'No es un nombre valido' },
    ],
    lastName: [
      { type: 'required', message: 'El apellido es requerido' },
      {
        type: 'minlength',
        message: 'El apellido debe ser de minimo 6 caracteres',
      },
      {
        type: 'maxlength',
        message: 'El apellido debe ser un maximo de 16 caracteres',
      },
      { type: 'pattern', message: 'No es un apellido valido' },
    ],
  };

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private navCtlr: NavController,
    private storage: Storage,
    private authService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z]+$'),
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-Z]+$'),
        ])
      ),
    });
  }

  ngOnInit() {}

  async register(userData) {
    try {
      await this.authService.registerUser(userData);
      await this.goToLogin();
    } catch (error) {
      console.log(error);
    }
  }

  async goToLogin() {
    await this.navCtlr.navigateBack('/login');
  }
}
