import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];
  selectedCategory: Category;
  constructor(private dataHandler: DataHandlerService) {
  }

  // postConstruct
  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {
    // this.selectedCategory = category;
    // this.dataHandler.fillTasksByCategory(category);
  }
}

