import {Component, Input} from '@angular/core';
import {ITodo} from '../../shared/model/todo';

@Component({
  selector: 'todo-detail',
  template: require('./todo-detail.html'),
  styles: [
    require('./todo-detail.css')
  ]
})
export class TodoDetail {
  @Input() todo: ITodo;
}
