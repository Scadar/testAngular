import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  tasks: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]){
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  selectTask = new EventEmitter<Task>();

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string {

    // цвет завершенной задачи
    if (task.completed) {
      return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

  }

  // Настройка DataSource
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

    });
  }
}
