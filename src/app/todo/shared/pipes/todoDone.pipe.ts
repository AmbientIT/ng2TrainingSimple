import {Pipe, PipeTransform} from '@angular/core';
import {ITodo} from '../model/todo';
// if we want to use resolve alias from webpack.config.js file
// import {ITodo} from 'todo/shared/model/todo';

@Pipe({
  name: 'tododone'
})
export class TodoDone implements PipeTransform{
  transform(value: ITodo[], args: boolean[]) {
    return value.filter(todo => todo.done === args[0]);
  }
}
