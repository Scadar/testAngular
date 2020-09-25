import {Component, OnInit} from '@angular/core';
import { Task } from './model/Task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularProject';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
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
    console.log(task);
  }
}
