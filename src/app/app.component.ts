import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';
import {TestData} from './data/TestData';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularProject';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category;
  statusFilter: boolean;
  searchTaskText = '';
  searchPriority: Priority;
  searchCategoryText: string;


  totalTaskCountInCategory: number;
  completeTaskCountInCategory: number;
  uncompletedTaskCountInCategory: number;
  uncompletedTotalTaskCountInCategory: number;
  showStat = true;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.onSelectCategory(null);
  }


  onSelectCategory(category: Category): void {

    this.selectedCategory = category;

    this.updateTasksAndStat();
  }

  onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe((cat) => {
      this.updateTasksAndStat();
    });
  }

  onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).subscribe((cat) => {
      this.updateTasksAndStat();
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe((cat) => {
      this.selectedCategory = null;
      this.onSelectCategory(null);
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onFilterByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterByTitle(text: string): void {
    this.searchTaskText = text;
    this.updateTasks();
  }

  onFilterByPriorities(priority: Priority): void {
    this.searchPriority = priority;
    this.updateTasks();
  }

  private updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.searchPriority
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }


  onAddTask(task: Task): void {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    });
  }

  onAddCategory(category: Category): void {
    this.dataHandler.addCategory(category).subscribe(result => {
      this.updateCategories();
    });
  }

  private updateCategories(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSearchCategory(text: string): void {
    this.searchCategoryText = text;
    this.dataHandler.searchCategories(this.searchCategoryText).subscribe(categories => this.categories = categories);
  }

  updateTasksAndStat(): void {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat(): void {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())
      .subscribe(array => {
        this.totalTaskCountInCategory = array[0];
        this.completeTaskCountInCategory = array[1];
        this.uncompletedTaskCountInCategory = array[2];
        this.uncompletedTotalTaskCountInCategory = array[3];
      });
  }

  onToggleStat(value: boolean): void {
    this.showStat = value;
  }
}
