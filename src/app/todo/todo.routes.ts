import {RouterConfig} from '@angular/router';
import {TodoComponent} from './todo.component';
import {List} from './list/list.component';
import {TodoCreate} from './create/todo-create.component';
import {Detail} from './detail/detail.component'

export const todoRoutes: RouterConfig = [
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      {
        path: 'create',
        component: TodoCreate
      },
      {
        path: 'list',
        component: List
      },
      {
        path: 'detail/:id',
        component: Detail
      }
    ]
  },
]
