import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {Task} from '../../model/Task';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {reduce} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();
  @Input()
  selectedCategory: Category;
  @Input()
  categoryMap = new Map<Category, number>();
  @Input()
  allUnfinishedTask: number;

  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();
  @Output()
  addCategory = new EventEmitter<Category>();
  @Output()
  searchCategory = new EventEmitter<string>();

  indexMouseMove: number;
  searchCategoryTitle: string;


  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {
    if (this.selectedCategory === category){
      return;
    }
    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: [category, 'Редактировать категорию'], autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete'){
        this.deleteCategory.emit(category);
        return;
      }
      if (result as Category){
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  openAddCategoryDialog(): void {
    const category = new Category(null, '');
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category, 'Добавление категории']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.addCategory.emit(category);
      }
    });
  }

  search(): void {
    if (this.searchCategoryTitle === null){
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}

