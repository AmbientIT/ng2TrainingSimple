import {Component, OnInit, Input} from '@angular/core';
import {ITodo} from '../shared/todo.model';

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html')
})
export class TodoList {
  @Input() todos : ITodo[];
  query: string = '';
}
