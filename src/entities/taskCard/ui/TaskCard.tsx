import './styles.scss';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { IconDocDelete } from '@consta/icons/IconDocDelete';
import { Button } from '@consta/uikit/Button';
import { useDraggable } from '@dnd-kit/core';
import { IconDrag } from '@consta/icons/IconDrag';
import { Task } from '../../taskCard/model/taskCardSlice';
import { TaskStatus } from '../../taskCard';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id.toString(),
    // id: task.id,
    data: { column: task.status },
  });
  return (
    <Card verticalSpace="xs" horizontalSpace="xs" className="card" ref={setNodeRef}>
      <Button onlyIcon iconLeft={IconDrag} view="clear" {...attributes} {...listeners} size="s" />
      <Text size="m" view="brand" weight="bold">
        {task.title}title
      </Text>
      <Text size="s" view="primary">
        {task.description}
      </Text>
      <Text size="xs" view="secondary">
        ID: {task.id}
      </Text>
      <Button
        label="Удалить"
        view="secondary"
        size="s"
        className="card__button"
        iconRight={IconDocDelete}
        iconSize="s"
        onClick={() => {
          onDelete(task.id);
        }}
      />
    </Card>
  );
};
