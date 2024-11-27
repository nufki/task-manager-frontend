import {provideState} from '@ngrx/store';
import * as fromItems from './task.reducer';

// It's a good practice to outsource an overview of all features within the application...
export const STATE_PROVIDERS = [
  provideState({
    name: fromItems.FEATURE_KEY,
    reducer: fromItems.taskReducer,
  }),
];
