import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority',
  templateUrl: './edit-priority.component.html',
  styleUrls: ['./edit-priority.component.css']
})
export class EditPriorityComponent implements OnInit {


  dialogTitle: string; // текст для диалогового окна
  priorityTitle: string; // текст для названия приоритета (при реактировании или добавлении)

  constructor(
    private dialogRef: MatDialogRef<EditPriorityComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string], // данные, которые передали в диалоговое окно
  ) {
  }

  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
  }

  // нажали ОК
  onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(false);
  }

}
