import {Observable} from 'rxjs/Rx';

export interface IApi<T> {
  state$: Observable<T[]>;
  findAll(params?: any): void;
  findOne(id: string): Observable<T>;
  create(item: T): void;
  update(item: T): void;
  destroy(item: T): void;
}
