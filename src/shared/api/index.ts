import { Task, ApiTask, TaskStatus } from '../../entities/taskCard/model/taskCardSlice';
import { v4 as uuidv4 } from 'uuid';

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Ошибка получения задач');
  }
  const data: ApiTask[] = await response.json();
  return data.slice(0, 20).map((task) => ({
    ...task,
    // id: task.id,
    // title: task.title,
    description: 'Описание задачи',
    status: 'Очередь',
  }));
}

export async function addTask(title: string, description: string): Promise<Task> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error('Ошибка добавления задачи');
  }
  const data: ApiTask = await response.json();
  return { id: uuidv4(), title: data.title, description, status: 'Очередь' };
}

export async function deleteTask(taskId: string): Promise<string> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Ошибка удаления задачи');
  }
  return taskId;
}

export async function updateTask(taskId: string, status: TaskStatus): Promise<Task> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Ошибка обновления задачи');
  }
  const updatedTask = await response.json();
  return { ...updatedTask, id: taskId, status };
}
