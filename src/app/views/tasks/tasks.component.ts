import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  @Input()
  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  // в этом методе уже все проинциализировано, поэтому можно присваивать объекты (иначе может быть ошибка undefined)
  ngAfterViewInit(): void {

    this.addTableObjects();

  }


  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
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

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private fillTable(): void {

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();


    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
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
}
