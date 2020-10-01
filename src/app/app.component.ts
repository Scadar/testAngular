import {Component, OnInit} from '@angular/core';
import { Task } from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './model/Category';
import {Priority} from './model/Priority';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularProject';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];
  selectedCategory: Category;
  statusFilter: boolean;
  searchTaskText = '';
  searchPriority: Priority;

  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.onSelectCategory(null);
  }


  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onSelectTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  onDeleteTask(task: Task): void{
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe((cat) => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category)
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


}
