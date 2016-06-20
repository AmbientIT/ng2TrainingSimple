import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ITodo} from '../../shared/model/todo.ts';

@Component({
  selector: 'todo-item',
  template: require('./todo-item.html')
})
export class TodoItem {
  @Input() todo: ITodo;
  @Output() onTodoUpdate: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  constructor() {}

  updateTodo() {
    this.onTodoUpdate.next(this.todo);
  }
}
