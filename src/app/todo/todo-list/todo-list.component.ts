import {Component, OnInit, Input} from '@angular/core';
import {TodoItem} from '../todo-item/todo-item.component';
import {ITodo} from '../shared/todo.model';
import {TodoFilterByTitle} from '../shared/todo-filter-by-title.pipe'

@Component({
  selector: 'todo-list',
  template: require('./todo-list.html'),
  pipes: [
    TodoFilterByTitle
  ],
  directives: [
    TodoItem
  ]
})
export class TodoList {
  @Input() todos : ITodo[]
}
