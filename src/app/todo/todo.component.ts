import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {TodoApi} from './shared/model/todo.api';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'todo',
  template: require('./todo.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [TodoApi]

})
export class TodoComponent{

}
