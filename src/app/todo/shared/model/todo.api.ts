import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {ITodo} from './todo';
import {IApi} from '../../../shared/api'

const URI: string = 'http://localhost:3001/todo';

const headers = new Headers({
  'Content-Type': 'application/json'
})
const options = new RequestOptions({
  headers
})

@Injectable()
export class TodoApi implements IApi<ITodo> {
  state$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([])
  private store: ITodo[] = [];

  constructor(private http: Http) {}

  findAll(): void {
    this.http.get(URI)
      .map((res: Response) => res.json())
      .do((todos: ITodo[]) => this.store = todos)
      .subscribe(
        (todos: ITodo[]) => this.state$.next(this.store),
        (err: Error) => console.error('error', err)
      )
  }

  create(todo: ITodo): void {
    this.http.post(URI, JSON.stringify(todo), options)
      .map((res: Response) => res.json())
      .subscribe(
        (todo: ITodo) => {
          this.store = [...this.store, todo];
          this.state$.next(this.store)
        },
        (err: Error) => console.log(err)
      )
  }

  findOne(id: string): Observable<ITodo> {
    return this.http.get(`${URI}/${id}`)
      .map((res: Response) => res.json())
      .do((todo: ITodo) => {
        const existingTodo = this.store.find((item: ITodo) =>  {
          return todo.id === item.id;
        });
        if(!existingTodo) {
            this.store = [...this.store, todo]
            this.state$.next(this.store);
        }
      })
  }

  update(todo: ITodo): void {
    this.http.put(`${URI}/${todo.id}`, todo, options)
      .map((res: Response) => res.json())
      .do((updatedTodo: ITodo) => {
        const existingTodo = this.store.find((item: ITodo) =>  {
          return updatedTodo.id === item.id;
        });
        console.log('update', existingTodo);
        this.store[this.store.indexOf(existingTodo)] = updatedTodo;
        this.store = [...this.store];
      })
      .subscribe(
        () => this.state$.next(this.store),
        (err: Error) => console.error(err)
      )
  }

  destroy(todo: ITodo): void {
    this.http.delete(`${URI}/${todo.id}`)
      .map((res: Response) => res.json())
      .do(() => {
        this.store.splice(this.store.indexOf(todo), 1);
        this.store = [...this.store];
      })
      .subscribe(
        () => this.state$.next(this.store),
        (err: Error) => console.error(err)
      )

  }
}
