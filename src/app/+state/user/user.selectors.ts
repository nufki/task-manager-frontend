import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FEATURE_KEY, UserState} from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(FEATURE_KEY);

export const selectUsers = createSelector(
  selectUserState, (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState, (state) => state.loading
);
