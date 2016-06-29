import {bootstrap} from '@angular/platform-browser-dynamic';
import { App } from './app/app.component';

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call
bootstrap(App, [])
.catch(err => console.error(err));
