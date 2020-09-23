import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categorySubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { }

  fillTasks(): void{
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category): void{
    this.taskSubject.next(TestData.tasks.filter(task => task.category === category));
  }
}
