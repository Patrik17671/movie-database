import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import { localStorageMiddleware } from '../utils';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
