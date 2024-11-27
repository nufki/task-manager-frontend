import {createSelector} from "@ngrx/store";
import {selectAllTasksSorted, selectSortingType, selectTaskLoading} from "./task.selectors";

export const selectTasks = createSelector(
  selectAllTasksSorted,
  selectTaskLoading,
  selectSortingType,
  (tasks, loading, sortingType) => ({
    tasks,
    loading,
    sortingType
  }),
);
