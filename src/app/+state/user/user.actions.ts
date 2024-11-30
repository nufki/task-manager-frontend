import { createActionGroup, emptyProps, props} from '@ngrx/store';

// User Actions
export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Load Users': emptyProps(),
    'User Load Users Success':  props<{ users: string[] }>(),
    'User Load Users Failure': props<{ error: string }>(),
  },
});
