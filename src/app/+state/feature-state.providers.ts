import {provideState} from '@ngrx/store';
import * as fromTasks from './task/task.reducer';
import * as fromUsers from './user/user.reducer';


// It's a good practice to outsource an overview of all features within the application...
export const STATE_PROVIDERS = [
  provideState({
    name: fromTasks.FEATURE_KEY,
    reducer: fromTasks.taskReducer,
  }),

  provideState({
    name: fromUsers.FEATURE_KEY,
    reducer: fromUsers.userReducer,
  }),
];
