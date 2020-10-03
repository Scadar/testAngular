import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditPriorityComponent} from '../../dialog/edit-priority/edit-priority.component';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  @Input()
  priorities: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();
  @Output()
  updatePriority = new EventEmitter<Priority>();
  @Output()
  addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  onEditPriority(priority: Priority): void {
    const dialogRef = this.dialog.open(EditPriorityComponent, {data: [priority.title, 'Редактировать приоритет']});

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });

  }

  delete(priority: Priority): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите удаление', message: `Вы действительно хотите удалить приоритет: ${priority.title}?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deletePriority.emit(priority);
      }
    });
  }

  onAddPriority(): void {
    const dialogRef = this.dialog.open(EditPriorityComponent, {data: ['', 'Добавить приоритет']});

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });
  }
}
