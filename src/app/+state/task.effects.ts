import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {TaskActions} from './task.actions';
import {catchError, filter, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TaskService} from "../services/task.service";
import {ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";

@Injectable()
export class TaskEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private itemService = inject(TaskService);

  loadAllTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.loadTasks),
        mergeMap(() => this.itemService.fetchAllTasks()
          .pipe(
            tap(data => console.log('Fetched tasks:', data)),
            map(data => TaskActions.loadTasksSuccess({tasks: data})),
            catchError(error => of(TaskActions.loadTasksFailure({error: error.message})))
          )
        )
      ),
    {functional: true}
  );

  addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        mergeMap(({task}) => this.itemService.addTask(task)
          .pipe(
            tap(data => console.log('Added task:', data)),
            map(addedTask => TaskActions.addTaskSuccess({task: addedTask})),
            catchError(error => of(TaskActions.addTaskFailure({error: error.message})))
          )
        )
      ),
    {functional: true}
  );

  updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.updateTask),
        mergeMap(({task}) => this.itemService.updateTask(task)
          .pipe(
            tap(data => console.log('Task updated:', data)),
            map(updatedTask => TaskActions.updateTaskSuccess({task: updatedTask})),
            catchError(error => of(TaskActions.updateTaskFailure({error: error.message})))
          )
        )
      ),
    {functional: true}
  );

  deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        mergeMap(({id}) => this.itemService.deleteTask(id)
          .pipe(
            tap(() => console.log(`Deleted task with id: ${id}`)),
            map(() => TaskActions.deleteTaskSuccess({id})), // Dispatch success action with the task id
            catchError(error => of(TaskActions.deleteTaskFailure({error: error.message})))
          )
        )
      ),
    {functional: true}
  );

  // This is a very clever & effective way to select the active route (since I use the router store)
  selectTaskFromRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((action: RouterNavigatedAction) => {
        const url = action.payload.routerState.url;
        return url.startsWith('/tasks/');
      }),
      map((action: RouterNavigatedAction) => {
        const segments = action.payload.routerState.url.split('/');
        const taskId = segments[segments.length - 1];
        return TaskActions.selectTask({id: taskId});
      })
    );
  });

  ngrxOnInitEffects = () => TaskActions.onInit();
}

