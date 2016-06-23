import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ITodo} from '../../../shared/model/todo.ts';

@Component({
  selector: 'todo-item',
  template: require('./todo-item.html'),
  styles: [
    require('./todo-item.css')
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class TodoItem {
  @Input() todo: ITodo;
  @Output() onTodoUpdate: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() onTodoRemove: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  updateTodo(): void {
    this.onTodoUpdate.next(this.todo);
  }

  removeTodo(): void {
    this.onTodoRemove.next(this.todo);
  }
}
