import {provide, PLATFORM_PIPES, PLATFORM_DIRECTIVES} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app/app.component';

import {TodoTitlePipe} from './app/todo/shared/todo-title.pipe';
import {TodoItem} from './app/todo/todo-item/todo-item.component';
import {TodoList} from './app/todo/todo-list/todo-list.component';

const APP_PROVIDERS = []

const APP_PIPES = [
  TodoTitlePipe
]

const APP_DIRECTIVES = [
  TodoItem,
  TodoList
]

//enableProdMode()  remove ELEMENT_PROBE_PROVIDERS from the array in bootstrap call
bootstrap(App, [
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
