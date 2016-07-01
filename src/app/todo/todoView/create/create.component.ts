import 'rxjs/add/operator/filter';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ITodo} from '../../shared/todo.model';
import {TodoProvider} from '../../shared/todo.provider';

@Component({
  selector: 'create-view',
  template: require('./create.html'),
  styles: [
    require('./create.css')
  ]
})
export class Create implements OnInit{
  todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: TodoProvider,
    private router: Router
  ) {}

  private createTodoForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.todoForm = this.createTodoForm()
    this.todoForm.valueChanges
      .map(data => {
        data.title = data.title.toUpperCase();
        return data;
      })
      .filter(() => {
        return this.todoForm.valid;
      })
      .subscribe(data => {
        console.log('value changes ', data);
      })
  }

  onSubmitForm() {
    const todoClone = Object.assign({}, this.todoForm.value)
    this.api.create(todoClone);
    const subscription = this.api.state$
      .skip(1)
      .subscribe(data => {
        alert('toto created');
        this.router.navigate(['/todo/list']);
        subscription.unsubscribe()
      });
  }

}
