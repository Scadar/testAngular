import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskDAOArray = new TaskDAOArray();
  categoryDAOArray = new CategoryDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]>{
    return this.taskDAOArray.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return this.categoryDAOArray.getAll();
  }
}
