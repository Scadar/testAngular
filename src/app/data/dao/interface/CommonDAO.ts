import {Observable} from 'rxjs';


export interface CommonDAO<T>{

  get(id: number): Observable<T>;

  getAll(): Observable<T[]>;

  add(T): Observable<T>;

  delete(id: number): Observable<T>;

  update(T): Observable<T>;
}
