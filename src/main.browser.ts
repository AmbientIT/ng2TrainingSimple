import {bootstrap} from '@angular/platform-browser-dynamic';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser';
import {enableProdMode, PLATFORM_PIPES, provide} from '@angular/core';
import {provideRouter} from '@angular/router';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {TRANSLATE_PROVIDERS, TranslatePipe} from 'ng2-translate/ng2-translate';
import { App } from './app/app.component';
import {appRoutes} from './app/app.routes';

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call
bootstrap(App, [
  disableDeprecatedForms(),
  provideForms(),
  provideRouter(appRoutes),
  //make translate pipe available globally
  provide(PLATFORM_PIPES, {useValue: [TranslatePipe], multi: true}),
  ELEMENT_PROBE_PROVIDERS,
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS
])
.catch(err => console.error(err));
