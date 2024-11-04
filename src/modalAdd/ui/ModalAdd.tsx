import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { closeModal } from '../model/modalAddSlice';
import { addTask } from '../../../entities/taskCard';
import { useState } from 'react';

export const ModalAdd: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTask({ title, description }));
    dispatch(closeModal());
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isModalOpen}
      hasOverlay
      onClickOutside={() => dispatch(closeModal())}
      onEsc={() => dispatch(closeModal())}>
      <Text as="p" size="s" view="secondary" lineHeight="m">
        Добавить задачу
      </Text>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <label className="form__label">
          <input
            required
            className="form__input"
            type="text"
            name="title"
            placeholder="Название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="form__span"></span>
        </label>

        <label className="form__label">
          <input
            required
            className="form__input"
            type="text"
            name="description"
            placeholder="Описание задачи"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="form__span"></span>
        </label>
        <button className="form__button" type="submit">
          Добавить
        </button>
      </form>
      <div>
        <Button
          size="m"
          view="primary"
          label="Закрыть"
          width="default"
          onClick={() => dispatch(closeModal())}
        />
      </div>
    </Modal>
  );
};
