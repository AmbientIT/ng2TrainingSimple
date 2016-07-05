import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo-model';

@Pipe({
  name: 'filtertitle'
})
export class TodoTitlePipe implements PipeTransform{
  transform(value: Todo[], arg: string): Todo[] {
    // if(arg) {
    //   return value.filter(todo => todo.title.startsWith(arg))
    // } else{
    //   return value;
    // }

    console.log(value, arg);

    return arg
      ? value.filter(todo => todo.title.startsWith(arg))
      : value;
  }
}
