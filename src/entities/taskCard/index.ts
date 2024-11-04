export { TaskCard } from './ui/TaskCard';
// export { fetchTasks, moveTask, deleteTask } from './model/taskCardSlice';
export {
  fetchTasksThunk,
  addTaskThunk,
  deleteTaskThunk,
  moveTask,
  updateTaskThunk,
} from './model/taskCardSlice';
export type { TaskStatus, ApiTask } from './model/taskCardSlice';
export { tasksReducer } from './model/taskCardSlice';
