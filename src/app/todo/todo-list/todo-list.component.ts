import {Component, Input} from '@angular/core';
import {Todo} from '../shared/todo-model';
// import {TodoItem} from '../todo-item/todo-item.component';
// import {TodoTitlePipe} from '../shared/todo-title.pipe';

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html'),
  styles: [
    require('./todo-list.css')
  ]
})
export class TodoList {
  @Input() todos: Todo[];
  filterTitle: string = '';

  todoUpdateHandler(todo: Todo) {
    console.log('app component ', todo);
  }
}
