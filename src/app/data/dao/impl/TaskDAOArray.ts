import {TaskDAO} from '../interface/TaskDAO';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import { Task } from 'src/app/model/Task';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';


export class TaskDAOArray implements TaskDAO{
  add(task): Observable<Task> {
    if (task.id === null || task.id === 0){
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  delete(id: number): Observable<Task> {
    const taskTemp = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTemp), 1);
    return of(taskTemp);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(task => task.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, true, null).length);
  }

  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, null, null).length);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, false, null).length);
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    if (category != null){
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (searchText != null){
      allTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (status != null){
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (priority != null){
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    return allTasks;
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }
}
