# Канбан-доска

## Инструменты: React, TypeScript, Redux Toolkit, Consta, FSD, dnd-kit

В качестве API использовал https://jsonplaceholder.typicode.com

Реализовано:

- канбан-доска состоящая из четырех колонок «Очередь», «В работе», «На проверке», «Выполнено»;
- получение имеющихся карточек и вывод на доску (API предлагает 200 карточек, но я ограничил вывод до 20 карточек, не учитывая добавленные пользователем, для лучшего воспрития);
- реализовано добавление карточек в первую колонку;
- реализовано перетягивание карточки из одной колонки в другую с ограничениями: карточку можно перетаскивать только слева направо и только в соседнюю колонку (**_перетаскивание карточки возможно при зажатии курсором кнопки с иконкой IconDrag на карточке и перемещением курсора в соседнюю колонку, сейчас возможно не хватает анимации перетаскивания, но сам механизм работает_**) иконка IconDrag активна в моменте перетаскивания;
- добавлена возможность удаления карточки;
- реализованы запросы к API на получение, обновление и удаление карточек.
- на данный момент канбан-доска разработана для устройства с шиирной экрана от 1024px

[Деплой: https://kanban-gpn.netlify.app/](https://kanban-gpn.netlify.app/)

### Запуск локально:

npm install<br>
npm run dev
