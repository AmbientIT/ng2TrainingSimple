import {Component, OnInit} from '@angular/core';
import {TodoProvider} from '../../shared/todo.provider';
import {ITodo} from '../../shared/todo.model';

@Component({
  selector: 'list-view',
  template: require('./list.html')
})
export class List implements OnInit {
  constructor(
    private api: TodoProvider
  ) {}

  ngOnInit() {
    this.api.findAll();
  }
}
