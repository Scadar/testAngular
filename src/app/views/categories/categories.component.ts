import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private dataHandler: DataHandlerService) {
  }

  // postConstruct
  ngOnInit(): void {
    this.dataHandler.categorySubject.subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category): void {
    this.dataHandler.fillTasksByCategory(category);
  }
}

