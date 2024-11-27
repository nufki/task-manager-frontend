import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {SortingType, Task} from './task.model';

// Actions
export const TaskActions = createActionGroup({
  source: 'Item',
  events: {
    'On Init': emptyProps,
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Add Task': props<{ task: Task }>(),
    'Add Task Success': props<{ task: Task }>(),
    'Add Task Failure': props<{ error: string }>(),
    'Update Task Success': props<{ task: Task }>(),
    'Update Task Failure': props<{ error: string }>(),
    'Delete Task': props<{ id: string }>(),
    'Delete Task Success': props<{ id: string }>(),
    'Delete Task Failure': props<{ error: string }>(),
    'Select Task': props<{ id: string }>(),
    'Update Task': props<{ task: Task }>(),
    'Sort Task': props<{ sortingType: SortingType }>(),
  },
});
