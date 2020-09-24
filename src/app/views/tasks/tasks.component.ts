import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  tasks: Task[];
  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.taskSubject.subscribe( tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  private refreshTable(): void {
    this.dataSource.data = this.tasks;
  }

  getPriorityColor(task: Task): string {
    if (task.completed){
      return '#f8f9fa';
    }
    if (task.priority && task.priority.color){
      return task.priority.color;
    }
    return '#fff';
  }
}
