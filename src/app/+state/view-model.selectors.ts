import {createSelector} from "@ngrx/store";
import {selectAllTasksSorted, selectSortingType, selectTaskLoading} from "./task.selectors";

export interface TasksState {
  tasks: ReturnType<typeof selectAllTasksSorted>;
  loading: ReturnType<typeof selectTaskLoading>;
  sortingType: ReturnType<typeof selectSortingType>;
}


export const selectTasks = createSelector(
  selectAllTasksSorted,
  selectTaskLoading,
  selectSortingType,
  (tasks, loading, sortingType): TasksState => ({
    tasks,
    loading,
    sortingType
  }),
);
