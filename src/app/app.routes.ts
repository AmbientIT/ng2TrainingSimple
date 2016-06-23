import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TodoComponent} from './todo/todo.component';
import {todoRoutes} from './todo/todo.routes';

export const appRoutes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  ...todoRoutes
]
