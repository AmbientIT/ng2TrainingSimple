import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {TodoApi} from '../shared/model/todo.api';
import {ITodo} from '../shared/model/todo';
import {TodoDetail} from './todo-detail/todo-detail.component';

@Component({
  selector: 'detail',
  template: require('./detail.html'),
  directives: [TodoDetail]
})
export class Detail implements OnInit{
  todo$: Observable<ITodo>;
  constructor(
    private routeParams: ActivatedRoute,
    private todoApi: TodoApi
  ) {}

  ngOnInit() {
    this.todo$ = this.routeParams.params
      .map((params: any) => params.id)
      .mergeMap((id: string) => this.todoApi.findOne(id))
  }
}
