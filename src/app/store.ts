import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '../entities/taskCard';
import { modalReducer } from '../features/modalAdd';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
