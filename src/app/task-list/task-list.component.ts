import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Task {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'actions', 'priority'];
  dataSource = new MatTableDataSource(this.tasks);

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks.push(result);
        console.log(this.tasks);
        this.dataSource = new MatTableDataSource(this.tasks);
      }
    });
  }

  deleteTask(task: any): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.tasks);
    }
    this.openSnackBar("Task completed")
  }
  
  getTasksDueToday(): any[] {
    const today = new Date();
    return this.tasks.filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate.toDateString() === today.toDateString();
    });
  }
  
  openSnackBar(message: string): void{
    this.snackBar.open(message, 'Close', {duration: 3000});
  }

  getHighPriorityTasksCount(): number {
    return this.tasks.filter(task => task.priority === 'High').length;
  }
}
