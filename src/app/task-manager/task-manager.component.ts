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
import {TasksViewModel} from "../+state/view-model.selectors";
import {UserActions} from "../+state/user/user.actions";
import {selectUsers} from "../+state/user/user.selectors";
import {AppHeaderComponent} from "../ui/app-header/app-header.component";
import {getCurrentUser, GetCurrentUserOutput, signOut} from 'aws-amplify/auth';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    TaskListComponent,
    AsyncPipe,
    LetDirective,
    AddTaskComponent,
    AppHeaderComponent
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent implements OnInit {
  protected tasks$: Observable<TasksViewModel>;
  protected userList$: Observable<string[]>;
  protected user?: GetCurrentUserOutput;

  constructor(private readonly store: Store) {
    this.tasks$ = this.store.select(ViewModelSelectors.selectTasks);
    this.userList$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
    this.store.dispatch(UserActions.userLoadUsers());
    this.currentAuthenticatedUser();
  }

  public onLoadMoreTasks(): void {
    console.log('onLoadMoreTasks')
    this.store.dispatch(TaskActions.loadMoreTasks());
  }

  public onLoadUsers($event: void) {
    console.log('onLoadUsers called')
    this.store.dispatch(UserActions.userLoadUsers());
  }

  public onAddNewTask(task: Task) {
    this.store.dispatch(TaskActions.addTask({task}));
  }

  public onDeleteTask(task: Task) {
    if (task?.id)
    this.store.dispatch(TaskActions.deleteTask({id: task.id}));
  }

  public onSortingTask(sortingType: SortingType) {
    this.store.dispatch(TaskActions.sortTask({sortingType}));
  }

  async signOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  async currentAuthenticatedUser() {
    try {
      this.user = await getCurrentUser();
      const {username, userId, signInDetails} = this.user;

      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }

}
