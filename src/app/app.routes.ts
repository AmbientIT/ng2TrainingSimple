import {RouterConfig} from '@angular/router';

import {HomeView} from './homeView/homeView.component';
import {TodoView} from './todo/todoView/todoView.component';
import {List} from './todo/todoView/list/list.component';
import {Create} from './todo/todoView/create/create.component';

export const appRoutes: RouterConfig = [
  {
    path: '',
    component: HomeView
  },
  {
    path: 'todo',
    component: TodoView,
    children: [
      {
        path: 'list',
        component: List
      },
      {
        path: 'create',
        component: Create
      }
    ]
  }
]
