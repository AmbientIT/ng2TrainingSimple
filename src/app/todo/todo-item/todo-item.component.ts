import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ITodo} from '../shared/todo.model';

@Component({
  selector: 'todo-item',
  template: require('./todo-item.html'),
  styles: [
    require('./todo-item.css')
  ]
})
export class TodoItem {
  @Input() todo: ITodo;
  @Output() onTodoUpdate: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() onTodoRemove: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  remove(): void {
    this.onTodoRemove.emit(this.todo);
  }

  update(): void {
    this.onTodoUpdate.emit(this.todo)
  }
}
