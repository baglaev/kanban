import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '../entities/taskCard';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
