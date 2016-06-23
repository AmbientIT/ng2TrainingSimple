import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Rx';
import {TodoApi} from '../shared/model/todo.api'

@Component({
  selector: 'todo-create',
  template: require('./todo-create.html'),
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class TodoCreate implements OnDestroy{
  todoForm: FormGroup;
  subscription: Subscription
  constructor(
    private fb: FormBuilder,
    private todoApi: TodoApi,
    private router: Router)
  {
    this.todoForm = this.createTodoForm();
  }

  private createTodoForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],
      dueTo: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe()
  }

  createTodo() {
    const todo = Object.assign({done: false}, this.todoForm.value);
    this.todoApi.create(todo);
    this.subscription = this.todoApi.state$
      .subscribe(() => this.router.navigate(['/todo/list']))
  }
}
