import {Component, EventEmitter, Output} from '@angular/core';
import {Task, TaskPriority, TaskStatus} from '../../+state/task.model';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  @Output() addTask = new EventEmitter<Task>();

  newTaskName = '';
  newTaskDescription = '';
  newTaskStatus: TaskStatus = TaskStatus.NotStarted;
  newTaskPriority: TaskPriority = TaskPriority.Medium;
  private _newTaskDueDate: Date = new Date();

  onAddTask(): void {
    const newTask: Task = {
      name: this.newTaskName,
      description: this.newTaskDescription,
      status: this.newTaskStatus,
      priority: this.newTaskPriority,
      dueDate: this._newTaskDueDate,
    };

    this.addTask.emit(newTask);
    this.resetForm();
  }

  get newTaskDueDate(): string {
    return this._newTaskDueDate.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  }

  // Setter for newTaskDueDate to convert the input string back into a Date object
  set newTaskDueDate(value: string) {
    this._newTaskDueDate = new Date(value); // Convert string to Date
  }

  private resetForm(): void {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskStatus = TaskStatus.NotStarted;
    this.newTaskPriority = TaskPriority.Medium;
    this._newTaskDueDate = new Date();
  }
}
