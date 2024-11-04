import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared';
import { Column } from '../../../../entities/column';
import { fetchTasks, moveTask, deleteTask } from '../../../../entities/taskCard';
import { TaskStatus } from '../../../../entities/taskCard';
import { RootState } from '../../../store';

import { ModalAdd } from '../../../../modalAdd';
import { Button } from '@consta/uikit/Button';
import { openModal } from '../../../../modalAdd';
// import { deleteTask } from '../../entities/taskCard';
import './styles.scss';

export const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  // const tasks = useAppSelector((state) => state.tasks.tasks);
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const statuses: TaskStatus[] = ['Очередь', 'В работе', 'На проверке', 'Выполнено'];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    dispatch(moveTask({ id: taskId, status: newStatus }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const currentColumnIndex = statuses.indexOf(active.data.current?.column);
      const newColumnIndex = statuses.indexOf(over.id as TaskStatus);

      if (newColumnIndex === currentColumnIndex + 1) {
        // handleTaskMove(parseInt(active.id), over.id);
        handleTaskMove(active.id, over.id);
      }
    }
  };

  return (
    <>
      <Button
        size="m"
        view="primary"
        label="Добавить задачу"
        onClick={() => dispatch(openModal())}
      />

      <ModalAdd />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="board">
          {statuses.map((column) => (
            <Column
              key={column}
              tasks={tasks}
              status={column}
              onTaskMove={handleTaskMove}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
};