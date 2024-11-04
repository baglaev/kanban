import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared';
import { Column } from '../../../../entities/column';
import { fetchTasks, moveTask } from '../../../../entities/taskCard';
import { TaskStatus } from '../../../../entities/taskCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../app/store';

// import { ModalAdd } from '../../../../modalAdd';
// import { Button } from '@consta/uikit/Button';
// import { openModal } from '../../../../modalAdd';
// import { deleteTask } from '../../entities/taskCard';
import './styles.scss';

// interface Task {
//   id: string;
//   title: string;
//   description: string;
// }

// interface ColumnType {
//   id: string;
//   title: string;
//   tasks: Task[];
// }

export const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const statuses = ['Очередь', 'В работе', 'На проверке', 'Выполнено'];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // const handleDelete = (taskId: string) => {
  //   dispatch(deleteTask(taskId));
  // };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    dispatch(moveTask({ id: taskId, status: newStatus }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const currentColumnIndex = statuses.indexOf(active.data.current?.column);
      const newColumnIndex = statuses.indexOf(over.id);

      if (newColumnIndex === currentColumnIndex + 1) {
        handleTaskMove(parseInt(active.id), over.id);
      }
    }
  };

  return (
    <>
      {/* <Button
        size="m"
        view="primary"
        label="Добавить задачу"
        onClick={() => dispatch(openModal())}
      />

      <ModalAdd /> */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="board">
          {statuses.map((column) => (
            // <Column key={column} tasks={tasks} title={column} onTaskMove={handleTaskMove} />
            <Column
              key={column}
              tasks={tasks}
              status={column as any}
              onTaskMove={handleTaskMove}
              // onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
};
