import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {App} from './app/app.component';

const APP_PROVIDERS = []

const APP_PIPES = []

const APP_DIRECTIVES = []

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call
bootstrap(App, [])
.catch(err => console.error(err));
