import {Component, OnInit, Input} from '@angular/core';
import {ITodo} from '../shared/todo.model';
import {TodoProvider} from '../shared/todo.provider';

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html')
})
export class TodoList {
  @Input() todos : ITodo[];
  query: string = '';

  constructor(
    private api: TodoProvider
  ) {}

  todoUpdateHandler(todo: ITodo) {
    const todoClone = Object.assign({}, todo);
    todoClone.isDone = !todoClone.isDone;
    this.api.update(todoClone);
  }

  todoRemoveHandler(todo: ITodo) {
    this.api.destroy(todo);
  }
}
