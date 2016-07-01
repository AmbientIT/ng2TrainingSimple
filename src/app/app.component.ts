import {Component, OnInit} from '@angular/core';
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
  template: require('./app.html')
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
