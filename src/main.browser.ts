import {enableProdMode, provide, PLATFORM_PIPES, PLATFORM_DIRECTIVES} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app/app.component';

const APP_PROVIDERS = [

]

const APP_PIPES = [

]

const APP_DIRECTIVES = [

]

WEBPACK_ENV === 'production' ? enableProdMode() : require('zone.js/dist/long-stack-trace-zone');

bootstrap(App, [
  APP_PROVIDERS,
  provide(PLATFORM_PIPES, {
    multi: true,
    useValue: APP_PIPES
  }),
  provide(PLATFORM_DIRECTIVES, {
    multi: true,
    useValue: APP_DIRECTIVES
  })
])
.catch(err => console.error(err));
