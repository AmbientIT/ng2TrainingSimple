import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Todo} from '../shared/todo-model';

@Component({
  selector: 'todo-item',
  template: require('./todo-item.html'),
  styles: [
    require('./todo-item.css')
  ]
  // , encapsulation: ViewEncapsulation.Native
})
export class TodoItem {
  @Input() todo: Todo;
  @Output() onTodoUpdate: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onTodoRemove: EventEmitter<Todo> = new EventEmitter<Todo>();

  updateTodo($event: MouseEvent) {
    console.log('update', $event);
    this.onTodoUpdate.emit(this.todo);
  }

  removeTodo($event: MouseEvent) {
    console.log('remove', $event);
    this.onTodoRemove.emit(this.todo);
  }






}
