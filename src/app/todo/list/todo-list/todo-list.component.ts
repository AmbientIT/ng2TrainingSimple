import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {ITodo} from '../../shared/model/todo.ts';
import {TodoItem} from './todo-item/todo-item.component';
import {TodoDone} from '../../shared/pipes/todoDone.pipe';
import {TodoApi} from '../../shared/model/todo.api'

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html'),
  directives: [TodoItem],
  pipes: [TodoDone]
})
export class TodoList {
  @Input() todos: Observable<ITodo[]>;
  isDone: boolean = false;

  constructor(private todoApi: TodoApi) {}

  todoUpdateHandler(todo: ITodo) {
    const todoClone = Object.assign({}, todo);
    todoClone.done = !todo.done;
    this.todoApi.update(todoClone);
  }

  todoRemoveHandler(todo: ITodo) {
    this.todoApi.destroy(todo);
  }
}
