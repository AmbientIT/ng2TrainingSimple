import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { App } from './app/app.component';

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call

bootstrap(App, [
  ELEMENT_PROBE_PROVIDERS
])
.catch(err => console.error(err));
