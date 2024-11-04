import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TaskStatus = 'Очередь' | 'В работе' | 'На проверке' | 'Выполнено';
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

interface ApiTask {
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

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Ошибка получения задач');
      }
      const data: ApiTask[] = await response.json();
      return data.slice(0, 20).map((task) => ({
        ...task,
        description: 'Описание задачи',
        status: 'Очередь',
      })) as Task[];
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const addTask = createAsyncThunk<
  Task,
  { title: string; description: string },
  { rejectValue: string }
>('tasks/addTask', async ({ title, description }, { rejectWithValue }) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Ошибка добавления задачи');
    }
    const data: ApiTask = await response.json();
    return { id: uuidv4(), title: data.title, description, status: 'Очередь' } as Task;

    // const newTask = { id: uuidv4(), title: data.title, description, status: 'Очередь' } as Task;
    // console.log('Добавлена задача:', newTask);

    // return newTask;
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
    moveTask: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        console.log(`Изменение статуса задачи ${task.id} на ${action.payload.status}`);
        task.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, setLoading)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, setError)

      .addCase(addTask.pending, setLoading)
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, setError);
  },
});

export const { moveTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
