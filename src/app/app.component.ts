import {Component, OnInit} from '@angular/core';
// import {TodoItem} from './todo/todo-item/todo-item.component';
import {TodoList} from './todo/todo-list/todo-list.component';
import {ITodo} from './todo/shared/todo.model';


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: [
    require('./app.css')
  ],
  template: require('./app.html'),
  directives: [
    TodoList
  ]
})
export class App {
  todos: ITodo[] = [
    {
      title: 'learn Angular2',
      description: 'ez',
      isDone: false,
      dueDate: new Date()
    },
    {
      title: 'aller au ski',
      description: 'harde',
      isDone: false,
      dueDate: new Date()
    }
  ]
}
