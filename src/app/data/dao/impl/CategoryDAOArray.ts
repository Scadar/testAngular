import {CategoryDAO} from '../interface/CategoryDAO';
import {Observable, of} from 'rxjs';
import {Category} from '../../../model/Category';
import {TestData} from '../../TestData';


export class CategoryDAOArray implements CategoryDAO{

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0){
      category.id = this.getLastCategoryId();
    }
    TestData.categories.push(category);
    return of(category);
  }

  delete(id: number): Observable<Category> {

    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id){
        task.category = null;
      }
    });

    const categoryTemp = TestData.categories.find(c => c.id === id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTemp), 1);
    return of(categoryTemp);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(cat => cat.title.toLowerCase().includes(title.toLowerCase())));
  }

  update(category): Observable<Category> {
    const categoryTemp = TestData.categories.find(c => c.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(categoryTemp), 1, category);
    return of(category);
  }

  private getLastCategoryId(): number {
    return Math.max.apply(Math, TestData.categories.map(c => c.id));
  }
}
