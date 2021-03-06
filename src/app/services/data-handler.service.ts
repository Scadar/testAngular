import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDAOArray} from '../data/dao/impl/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/impl/CategoryDAOArray';
import {Priority} from '../model/Priority';
import {PriorityDAOArray} from '../data/dao/impl/PriorityDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskDAOArray = new TaskDAOArray();
  categoryDAOArray = new CategoryDAOArray();
  priorityDAOArray = new PriorityDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]>{
    return this.taskDAOArray.getAll();
  }

  getAllCategories(): Observable<Category[]>{
    return this.categoryDAOArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>{
    return this.taskDAOArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task>{
    return this.taskDAOArray.update(task);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll();
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDAOArray.delete(id);
  }

  deleteCategory(id: number): Observable<Category>{
    return this.categoryDAOArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDAOArray.add(task);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.add(category);
  }

  searchCategories(searchCategoryText: string): Observable<Category[]> {
    return this.categoryDAOArray.search(searchCategoryText);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDAOArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDAOArray.getCompletedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDAOArray.getUncompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDAOArray.getUncompletedCountInCategory(null);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityDAOArray.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDAOArray.update(priority);
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDAOArray.add(priority);
  }
}
