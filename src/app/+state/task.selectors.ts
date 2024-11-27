import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FEATURE_KEY, State, taskAdapter} from "./task.reducer";
import {SortingType, Task, TaskPriority, TaskStatus} from './task.model';

// Select the tasks state slice
export const selectTasksState = createFeatureSelector<State>(FEATURE_KEY);
const {selectAll, selectEntities} = taskAdapter.getSelectors();

// Predefined order arrays for custom sorting
const priorityOrder = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];
const statusOrder = [TaskStatus.NotStarted, TaskStatus.InProgress, TaskStatus.Completed];


export const selectAllTasks = createSelector(selectTasksState, (state: State) =>
  selectAll(state),
);

export const selectTaskEntities = createSelector(
  selectTasksState,
  (state) => state ? selectEntities(state) : {}
);

export const selectTaskLoading = createSelector(
  selectTasksState,
  (state: State) => state.loading,
);

export const selectSelectedTaskId = createSelector(
  selectTasksState,
  (state: State) => state.selectedTaskId
);

export const selectSortingType = createSelector(
  selectTasksState,
  (state: State) => state.sortingType
);

export const selectSelectedTask = createSelector(
  selectTaskEntities,
  selectSelectedTaskId,
  (taskEntities, selectedTaskId): Task | null => {
    if (selectedTaskId && taskEntities[selectedTaskId]) {
      return {...taskEntities[selectedTaskId]};
    }
    return null;
  }
);

export const selectAllTasksSortedByPriority = createSelector(
  selectAllTasks,
  (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      const priorityOrder = [TaskPriority.High, TaskPriority.Medium, TaskPriority.Low];
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
  }
);

// Select all tasks sorted by Status
export const selectAllTasksSortedByStatus = createSelector(
  selectAllTasks,
  (tasks: Task[]) => {
    const statusOrder = [TaskStatus.NotStarted, TaskStatus.InProgress, TaskStatus.Completed];
    return [...tasks].sort((a, b) => {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
  }
);

// Select all tasks sorted by Due Date
export const selectAllTasksSortedByDueDate = createSelector(
  selectAllTasks,
  (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }
);

// Note how the 3 selectors have been joined together... the first round will take longer whereas
// all individual subsequent re-selects will be memoized and much faster than put all in a single selector...
export const selectAllTasksSorted = createSelector(
  selectTasksState,
  selectAllTasksSortedByPriority,
  selectAllTasksSortedByStatus,
  selectAllTasksSortedByDueDate,
  (state, sortedByPriority, sortedByStatus, sortedByDueDate) => {
    switch (state.sortingType) {
      case SortingType.HIGHEST_PRIO:
        return sortedByPriority;
      case SortingType.STATUS:
        return sortedByStatus;
      case SortingType.DUE_DATE:
        return sortedByDueDate;
      default:
        return sortedByDueDate; // Default fallback, if sorting type is not found
    }
  }
);

