import {createSelector} from "@ngrx/store";
import {selectAllTasksSorted, selectSortingType, selectTaskLoading} from "./task/task.selectors";
import {selectUsers} from "./user/user.selectors";

export interface TasksState {
  tasks: ReturnType<typeof selectAllTasksSorted>;
  loading: ReturnType<typeof selectTaskLoading>;
  sortingType: ReturnType<typeof selectSortingType>;
  // users: string[];
}


export const selectTasks = createSelector(
  selectAllTasksSorted,
  selectTaskLoading,
  selectSortingType,
  selectUsers,
  (tasks, loading, sortingType): TasksState => ({
    tasks,
    loading,
    sortingType
    // users
  }),
);


