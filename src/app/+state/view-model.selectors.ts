import {createSelector} from "@ngrx/store";
import {selectAllTasksSorted, selectNextToken, selectSortingType, selectTaskLoading} from "./task/task.selectors";
import {SortingType, Task} from "./task/task.model";

export interface TasksViewModel {
  tasks: Task[];
  loading: boolean;
  sortingType: SortingType;
  allTasksLoaded: boolean;
}


export const selectTasks = createSelector(
  selectAllTasksSorted,
  selectTaskLoading,
  selectSortingType,
  selectNextToken,
  (tasks, loading, sortingType,nextToken): {
    tasks: Task[]
    loading: boolean;
    sortingType: SortingType;
    allTasksLoaded: boolean;
  } => ({
    tasks,
    loading,
    sortingType,
    allTasksLoaded: nextToken === null,
  }),
);


