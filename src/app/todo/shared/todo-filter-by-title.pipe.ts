import {Pipe, PipeTransform} from '@angular/core';
import {ITodo} from './todo.model';

@Pipe({
  name: 'filterbytitle'
})
export class TodoFilterByTitle implements PipeTransform{
  transform(value: ITodo[], arg: string): ITodo[] {
    return value.filter(todo => todo.title.startsWith(arg));
  }
}
