import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  @Input('tasks')
  set setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.fillTable();
  }

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  tasks: Task[];

  @Input()
  priorities: Priority[];

  @Output()
  updateTask = new EventEmitter<Task>();
  @Output()
  deleteTask = new EventEmitter<Task>();
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  filterByTitle = new EventEmitter<string>();
  @Output()
  filterByStatus = new EventEmitter<boolean>();
  @Output()
  filterByPriorities = new EventEmitter<Priority>();

  searchTaskText: string;
  selectedStatusFilter: boolean;
  selectedPriorityFilter: Priority;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  getPriorityColor(task: Task): string {

    // цвет завершенной задачи
    if (task.completed) {
      return '#F8F9FA';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  private fillTable(): void {

    if (!this.dataSource){
      return;
    }

    this.dataSource.data = this.tasks;

    this.addTableObjects();

    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };

  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  openEditTaskDialog(task: Task): void{
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Редактировать задачи'], autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete'){
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task){
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите удаление', message: `Вы действительно хотите удалить задачу: ${task.title}?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleStatus(task: Task): void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category): void {
    this.selectCategory.emit(category);
  }

  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean): void {
    if (value !== this.selectedStatusFilter){
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(priority: Priority): void {
    if (priority !== this.selectedPriorityFilter){
      this.selectedPriorityFilter = priority;
      this.filterByPriorities.emit(this.selectedPriorityFilter);
    }
  }
}
