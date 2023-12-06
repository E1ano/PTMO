import {configureStore} from '@reduxjs/toolkit';
import {peopleReducer} from './slices/people.slice';
import {authReducer} from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
