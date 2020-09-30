import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {EditTaskDialogComponent} from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private date: [Category, string],
    private dialog: MatDialog
  ) { }

  dialogTitle: string;
  category: Category;

  tmpTitle: string;

  ngOnInit(): void {
    this.category = this.date[0];
    this.dialogTitle = this.date[1];

    this.tmpTitle = this.category.title;
  }

  onConfirm(): void {
    this.category.title = this.tmpTitle;
    this.dialogRef.close(this.category);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердить действие',
        message: `Вы дейтсвительно хотите удалить категорию: "${this.category.title}"? (Задачи не удалятся)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.dialogRef.close('delete');
      }
    });
  }

}
