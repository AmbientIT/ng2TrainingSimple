import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ITodo} from '../shared/model/todo.ts';
import {TodoItem} from './todo-item/todo-item.component'

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html'),
  directives: [TodoItem]
})
export class TodoList {
  @Input() todos: ITodo[];

  constructor() {}

  todoUpdateHandler(todo) {
    console.log('todo update !!!', todo);
  }
}
