import {PriorityDAO} from '../interface/PriorityDAO';
import {Observable, of} from 'rxjs';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';


export class PriorityDAOArray implements PriorityDAO{
  add(priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0){
      priority.id = this.getLastIdPriorities();
    }
    TestData.priorities.push(priority);
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach( task => {
      if (task.priority && task.priority.id === id){
        task.priority = null;
      }
    });
    const tempPrior = TestData.priorities.find(t => t.id === id);
    TestData.priorities.splice(TestData.priorities.indexOf(tempPrior), 1);
    return of(tempPrior);
  }

  get(id: number): Observable<Priority> {
    return of(TestData.priorities.find(p => p.id === id));
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority): Observable<Priority> {
    const tempPrior = TestData.priorities.find(t => t.id === priority.id);
    TestData.priorities.splice(TestData.priorities.indexOf(tempPrior), 1, priority);
    return of(priority);
  }

  private getLastIdPriorities(): number {
    return Math.max.apply(Math, TestData.categories.map(cat => cat.id)) + 1;
  }
}
