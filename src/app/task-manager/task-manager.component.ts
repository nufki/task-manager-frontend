import {Component, OnInit} from '@angular/core';
import {TaskActions} from "../+state/task.actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {SortingType, Task} from "../+state/task.model";
import {TaskListComponent} from "../ui/task-list/task-list.component";
import {AsyncPipe} from "@angular/common";
import {LetDirective} from "@ngrx/component";
import {AddTaskComponent} from "../ui/add-task/add-task.component";
import * as ViewModelSelectors from "../+state/view-model.selectors";


@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    TaskListComponent,
    AsyncPipe,
    LetDirective,
    AddTaskComponent
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit {
  protected vm$: Observable<{ loading: boolean; tasks: Task[]; sortingType: SortingType }>;

  constructor(private readonly store: Store) {
    this.vm$ = this.store.select(ViewModelSelectors.selectTasks);
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  public onAddNewTask(task: Task) {
    this.store.dispatch(TaskActions.addTask({task}));
  }

  public onSortingTask(sortingType: SortingType) {
    this.store.dispatch(TaskActions.sortTask({sortingType}));
  }
}
