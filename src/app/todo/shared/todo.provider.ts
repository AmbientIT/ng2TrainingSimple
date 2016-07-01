import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {BehaviorSubject, Subscription, Observable} from 'rxjs/Rx';
import {Api} from '../../shared/api';
import {ITodo} from './todo.model';

const URI = 'http://localhost:3001/todo';
const requestOptions = new RequestOptions({
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})

@Injectable()
export class TodoProvider implements Api<ITodo>{
  public state$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  private store: ITodo[]= [];

  constructor(
    private http: Http
  ) {}

  findAll(): void {
    this.http.get(URI, requestOptions)
      .map((res: Response) => res.json())
      .toPromise()
      .then((data) => {
        this.store = data;
        this.state$.next(this.store);
      })
      .catch(err => console.error(err))
  }

  findOne(id: string): Observable<ITodo> {
    return this.http.get(`${URI}/${id}`, requestOptions)
      .map((res: Response) => res.json())
  }

  create(todo: ITodo) {
    todo.isDone = false;
    this.http.post(URI, JSON.stringify(todo), requestOptions)
      .map((res: Response) => res.json())
      .toPromise()
      .then(createdTodo => {
        this.store = [...this.store, createdTodo];
        this.state$.next(this.store);
      })
      .catch(err => console.error(err))
  }

  update(todo: ITodo) {
    this.http.put(`${URI}/${todo.id}`, todo, requestOptions)
      .map((res: Response) => res.json())
      .toPromise()
      .then(updatedTodo => {
        const existingTodo = this.store.find(item => item.id === todo.id);
        this.store[this.store.indexOf(existingTodo)] = updatedTodo;
        this.store = [...this.store];
        this.state$.next(this.store);
      })
      .catch(err => console.error(err))
  }

  destroy(todo: ITodo) {
    this.http.delete(`${URI}/${todo.id}`, requestOptions)
      .map((res: Response) => res.json())
      .toPromise()
      .then(() => {
        this.store = this.store.filter(item => item.id !== todo.id);
        this.state$.next(this.store);
      })
      .catch(err => console.error(err));
  }
}
