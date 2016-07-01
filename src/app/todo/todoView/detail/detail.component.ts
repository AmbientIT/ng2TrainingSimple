import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {TodoProvider} from '../../shared/todo.provider';
import {ITodo} from '../../shared/todo.model';

@Component({
  selector: 'todo-detail',
  template: require('./detail.html')
})
export class TodoDetail implements OnInit, OnDestroy{
  todo: ITodo;
  todoSubscription: Subscription;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: TodoProvider
  ) {}

  ngOnInit() {
    this.todoSubscription = this.activeRoute.params
      .map((params: any) => params.id)
      .mergeMap(id => this.api.findOne(id))
      .subscribe(data => {
        this.todo = data;
      })
  }

  ngOnDestroy() {
    this.todoSubscription.unsubscribe();
  }

}
