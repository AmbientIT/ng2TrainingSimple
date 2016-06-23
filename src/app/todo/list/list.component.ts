import {Component, OnInit} from '@angular/core';
import {ITodo} from '../shared/model/todo';
import {TodoList} from './todo-list/todo-list.component';
import {TodoApi} from '../shared/model/todo.api';

@Component({
  selector: 'list',
  template: require('./list.html'),
  directives: [TodoList]
})
export class List implements OnInit{
  constructor(private todoApi: TodoApi) {}

  ngOnInit() {
    this.todoApi.findAll()
  }
}
