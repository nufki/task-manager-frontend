import {Component, OnInit} from '@angular/core';
import {TaskActions} from "../+state/task/task.actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {SortingType, Task} from "../+state/task/task.model";
import {TaskListComponent} from "../ui/task-list/task-list.component";
import {AsyncPipe} from "@angular/common";
import {LetDirective} from "@ngrx/component";
import {AddTaskComponent} from "../ui/add-task/add-task.component";
import * as ViewModelSelectors from "../+state/view-model.selectors";
import {TasksState} from "../+state/view-model.selectors";
import {UserActions} from "../+state/user/user.actions";
import {selectUsers} from "../+state/user/user.selectors";


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
  protected vm$: Observable<TasksState>;
  protected userList$: Observable<string[]>;

  constructor(private readonly store: Store) {
    this.vm$ = this.store.select(ViewModelSelectors.selectTasks);
    this.userList$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
    this.store.dispatch(UserActions.userLoadUsers());

    // Subscribe to userList$ to log the emitted value
    // this.userList$.subscribe(users => {
    //   console.log('User List:', users);
    // });
  }

  public onLoadUsers($event: void) {
    console.log('onLoadUsers called')
    this.store.dispatch(UserActions.userLoadUsers());
  }

  public onAddNewTask(task: Task) {
    this.store.dispatch(TaskActions.addTask({task}));
  }

  public onSortingTask(sortingType: SortingType) {
    this.store.dispatch(TaskActions.sortTask({sortingType}));
  }
}
