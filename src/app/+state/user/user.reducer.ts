import {createReducer, on} from '@ngrx/store';
import {UserActions} from "./user.actions";

export const FEATURE_KEY = 'users';

export interface UserState {
  users: string[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLoadUsers, (state) => ({...state, loading: true})),
  on(UserActions.userLoadUsersSuccess, (state, {users}) => ({...state, users, loading: false})),
  on(UserActions.userLoadUsersFailure, (state, {error}) => ({...state, error, loading: false}))
);
