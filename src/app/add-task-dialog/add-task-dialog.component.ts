import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: 'add-task-dialog.component.html',
  styleUrl: 'add-task-dialog.component.css'
})
export class AddTaskDialogComponent {
  task = { title: '', description: '', dueDate: new Date(), priority: ''}; // Initialize task object
  priorities: string[] = ["High", "Medium", "Low"];
  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) {}
  onSubmit(): void {
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
