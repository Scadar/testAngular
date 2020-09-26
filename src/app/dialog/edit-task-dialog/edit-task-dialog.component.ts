import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {TestData} from '../../data/TestData';
import {Priority} from '../../model/Priority';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private date: [Task, string],
    private dataHandler: DataHandlerService
  ) { }

  categories: Category[];
  priorities: Priority[];
  dialogTitle: string;
  task: Task;

  tmpTitle: string;
  tmpCategory: Category;
  tmpPriority: Priority;

  ngOnInit(): void {
    this.task = this.date[0];
    this.dialogTitle = this.date[1];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;

    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
