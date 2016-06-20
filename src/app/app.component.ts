import { Component, OnInit } from '@angular/core';
import {TodoList} from './todo-list/todo-list.component';
import {ITodo} from './shared/model/todo';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles: [
    require('./app.css')
  ],
  template: require('./app.html'),
  directives: [TodoList]
})
export class App implements OnInit{
  url: string = 'https://www.ambient-it.net/';
  todos: ITodo[] = [
    {
      title: 'apprendre angular2',
      description: 'ceci est une description',
      done: false,
      dueTo: new Date()
    },
    {
      title: 'apprendre angular3',
      description: 'plus tard',
      done: false,
      dueTo: new Date()
    }
  ]
  constructor() {}

  ngOnInit() {
    console.log('App started');
  }

}
