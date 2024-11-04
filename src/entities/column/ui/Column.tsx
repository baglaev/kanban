import { TaskCard } from '../../taskCard';
import { useDroppable } from '@dnd-kit/core';
import { TaskStatus } from '../../taskCard';
import { Task } from '../../taskCard/model/taskCardSlice';
import './styles.scss';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  onDelete: (id: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskMove, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: status });
  // console.log('id useDroppable:', id);

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div ref={setNodeRef} className="column">
      <h2>{status}</h2>
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onMove={onTaskMove}
          onDelete={onDelete}
          // onMove={onTaskMove}
        />
      ))}
    </div>
  );
};
