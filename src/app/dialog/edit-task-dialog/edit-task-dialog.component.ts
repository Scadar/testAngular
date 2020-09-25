import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Task } from 'src/app/model/Task';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private date: [Task, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  private dialogTitle: string;
  private task: Task;

  ngOnInit(): void {
    this.task = this.date[0];
    this.dialogTitle = this.date[1];

    console.log(this.task);
  }

}
