import { TaskCard } from '../../taskCard';
import { useDroppable } from '@dnd-kit/core';
import './styles.scss';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Очередь' | 'В работе' | 'На проверке' | 'Выполнено';
}

// interface ColumnProps {
//   id: string;
//   title: string;
//   tasks: Task[];
//   onDelete: (id: string) => void;
//   onTaskMove: (taskId: number, newStatus: string) => void;
// }

interface ColumnProps {
  status: 'Очередь' | 'В работе' | 'На проверке' | 'Выполнено';
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
  // onDelete: (id: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskMove }) => {
  const { setNodeRef } = useDroppable({ id: status });
  // console.log('id useDroppable:', id);

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div ref={setNodeRef} className="column">
      <h3>{status}</h3>
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          // id={task.id}
          // title={task.title}
          // description={task.description}
          task={task}
          onMove={onTaskMove}
          // onDelete={onDelete}
          // onMove={onTaskMove}
        />
      ))}
    </div>
  );
};
