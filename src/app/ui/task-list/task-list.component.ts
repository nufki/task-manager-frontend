import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortingType, Task} from '../../+state/task.model';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AddTaskComponent} from "../add-task/add-task.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    NgForOf,
    AddTaskComponent,
    RouterLink,
    DatePipe,
    NgClass
  ],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] | undefined;
  @Input() loading: boolean = false;
  @Input() sortingType: SortingType = SortingType.DUE_DATE;
  @Output() addTask = new EventEmitter<Task>();
  @Output() sortTasks = new EventEmitter<SortingType>();

  protected readonly SortingType = SortingType;
}
