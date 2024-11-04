import './styles.scss';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { IconDocDelete } from '@consta/icons/IconDocDelete';
import { Button } from '@consta/uikit/Button';
import { useDraggable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
import { IconDrag } from '@consta/icons/IconDrag';
import { Task } from '../../taskCard/model/taskCardSlice';

interface TaskCardProps {
  // id: string;
  // title: string;
  // description: string;
  task: Task;
  // onDelete: (id: string) => void;
  onMove: (id: string, newStatus: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id.toString(),
    data: { column: task.status },
  });
  // const style = {
  //   transform: CSS.Transform.toString(transform),
  // };

  return (
    <Card verticalSpace="xs" horizontalSpace="xs" className="card" ref={setNodeRef}>
      <Button onlyIcon iconLeft={IconDrag} view="clear" {...attributes} {...listeners} size="s" />
      <Text size="m" view="brand" weight="bold">
        {task.title}title
      </Text>
      <Text size="s" view="primary">
        {task.description}description
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
          // onDelete(id);
        }}
      />
    </Card>
  );
};
