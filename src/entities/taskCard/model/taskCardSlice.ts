import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Очередь' | 'В работе' | 'На проверке' | 'Выполнено';
}

export type TaskStatus = Task['status'];

interface ApiTask {
  id: string;
  title: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data: ApiTask[] = await response.json();
  return data.slice(0, 20).map((task) => ({ ...task, status: 'Очередь' })) as Task[];
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { moveTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
