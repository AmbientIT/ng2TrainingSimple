import {provide, PLATFORM_DIRECTIVES, PLATFORM_PIPES} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provideRouter, ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, provideForms, disableDeprecatedForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {TRANSLATE_PROVIDERS, TranslatePipe} from 'ng2-translate';

import {App} from './app/app.component';
import {TodoFilterByTitle} from './app/todo/shared/todo-filter-by-title.pipe';
import {TodoItem} from './app/todo/todo-item/todo-item.component';
import {TodoList} from './app/todo/todo-list/todo-list.component';
import {Navbar} from './app/navbar/navbar.component';
import {appRoutes} from './app/app.routes';
import {TodoProvider} from './app/todo/shared/todo.provider';

const APP_PROVIDERS = [
  TodoProvider,
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS
]

const APP_PIPES = [
  TodoFilterByTitle,
  TranslatePipe
]

const APP_DIRECTIVES = [
  TodoList,
  TodoItem,
  Navbar,
  ROUTER_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES
]

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call
bootstrap(App, [
  ...APP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  provideRouter(appRoutes),
  provide(PLATFORM_DIRECTIVES, {
    useValue: APP_DIRECTIVES,
    multi: true
  }),
  provide(PLATFORM_PIPES, {
    useValue: APP_PIPES,
    multi: true
  })
])
.catch(err => console.error(err));
