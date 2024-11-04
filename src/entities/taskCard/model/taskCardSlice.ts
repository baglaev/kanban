import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, updateTask } from '../../../shared/api';

export type TaskStatus = 'Очередь' | 'В работе' | 'На проверке' | 'Выполнено';
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface ApiTask {
  id: string;
  title: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksThunk = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTasks();
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const addTaskThunk = createAsyncThunk<
  Task,
  { title: string; description: string },
  { rejectValue: string }
>('tasks/addTask', async ({ title, description }, { rejectWithValue }) => {
  try {
    return await addTask(title, description);
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteTaskThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      return await deleteTask(taskId);
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateTaskThunk = createAsyncThunk<
  Task,
  { id: string; status: TaskStatus },
  { rejectValue: string }
>('tasks/updateTask', async ({ id, status }, { rejectWithValue }) => {
  try {
    return await updateTask(id, status);
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message);
  }
});

const setLoading = (state: TasksState) => {
  state.loading = true;
  state.error = null;
};

const setError = (state: TasksState, action: PayloadAction<string | undefined>) => {
  state.loading = false;
  state.error = action.payload || 'Произошла ошибка';
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        // console.log(`Изменение статуса задачи ${task.id} на ${action.payload.status}`);
        task.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, setLoading)
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksThunk.rejected, setError)

      .addCase(addTaskThunk.pending, setLoading)
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTaskThunk.rejected, setError)

      .addCase(deleteTaskThunk.pending, setLoading)
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, setError)

      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          task.status = action.payload.status;
        }
      })
      .addCase(updateTaskThunk.rejected, setError);
  },
});

export const { moveTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
