import {createReducer, on} from '@ngrx/store';
import {TaskActions} from "./task.actions";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {SortingType, Task} from "./task.model";

export const FEATURE_KEY = 'tasks';


export interface State extends EntityState<Task> {
  loading: boolean;
  selectedTaskId: string | null;
  sortingType: SortingType;
}

// Since the tasks are stored as an array, I make use of ngrx Entity Adapter to reduce boiler-plate code...
export const taskAdapter: EntityAdapter<Task> =
  createEntityAdapter<Task>();

export const initialState: State = taskAdapter.getInitialState({
  loading: false,
  selectedTaskId: null,
  sortingType: SortingType.DUE_DATE,
});

export const dataReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(TaskActions.loadTasksSuccess, (state, {tasks}) => {
    return taskAdapter.upsertMany(tasks, {
      ...state,
      loading: false,
    });
  }),
  on(TaskActions.loadTasksSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(TaskActions.addTaskSuccess, (state, {task}) =>
    taskAdapter.addOne(task, state)
  ),
  // Handle delete task success by filtering out the deleted task
  on(TaskActions.deleteTaskSuccess, (state, {id}) =>
    taskAdapter.removeOne(id, state)
  ),
  on(TaskActions.deleteTaskFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(TaskActions.selectTask, (state, {id}) => ({
    ...state,
    selectedTaskId: id
  })),
  on(TaskActions.sortTask, (state, {sortingType}) => ({
    ...state,
    sortingType: sortingType
  }))
);

export function taskReducer(state: any, action: any) {
  return dataReducer(state || initialState, action);
}
