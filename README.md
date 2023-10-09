# [Проект: Mesto Backend](<https://github.com/julfy-bs/mesto-project>)

***
"Mesto Backend" - cерверная часть приложения Mesto.

Работа выполнена на курсе [Web+][yandex-practicum-web-plus] от [Yandex Практикум][yandex-practicum-url].

## Доступные роуты

```
// Пользователи
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя 
PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар

// Карточки
GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору 
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки 
```

## История версий

- ***Версия 0.1.0***
  - Инициализирует приложение.
  - Добавляет конфигурацию компилятора TypeScript.
  - Настраивает editorconfig.
  - Настраивает линтер.
  - Добавляет исключения в Git.
  - Добавляет скрипты для управления приложением.
  - Подключает СУБД MongoDB.
  - Создает схемы и модели:
    - пользователя;
    - карточки.
  - Создает контроллеры и роуты для пользователей и карточек.
  - Создает тестового пользователя и реализовывает временное решение авторизации.
  - Добавляет централизованную обработку ошибок.
  - Добавляет валидацию передаваемых данных.
  - Приводит все ответы от сервера к единому виду.
  - Частично внедряет jsdoc.

| Спринт | Версия |                                                                    Технологии                                                                     |                 Чек-листы                  |
|:------:|:------:|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------:|
|   13   | 0.1.0  | [TypeScript][tech-ts] [ESLint][tech-eslint] [Mongoose][tech-mongoose] [Express][tech-express] [Celebrate][tech-celebrate] [Winston][tech-winston] | [чек-лист 13 спринта][project-checklist-1] |

## Доступные скрипты

### `npm run start`

Запускает приложение express-сервер на локальном сервере http://localhost:3000.

### `npm run dev`

Запускает приложение в режиме разработки с hot-reload'ом на локальном сервере http://localhost:3000.

### `npm run build`

Генерирует оптимизированную сборку проекта в папке `dist/`.

### `npm run clean`

Удаляет оптимизированную сборку проекта из папки `dist/`.

### `npm run lint`

Запускает линтер.

## Запустить проект

- Клонировать проект - `git clone git@github.com:julfy-bs/mesto-backend.git`
- Установить зависимости `npm install`
- Запустить сервер для разработки `npm run dev`

&copy; Автор - [Сутужко Богдан][author-github]

[//]: # 'Общие переменные для проектов Yandex'

[yandex-practicum-web-plus]: https://practicum.yandex.ru/promo/long-courses/web

[yandex-practicum-url]: https://practicum.yandex.ru/

[//]: # 'Общие переменные автора'

[author-github]: https://github.com/julfy-bs

[//]: # 'Переменные приложения'

[project-checklist-1]: https://code.s3.yandex.net/web-plus/checklists/checklist_pdf/checklist_20.pdf

[project-checklist-2]: https://code.s3.yandex.net/web-plus/checklists/checklist_pdf/checklist_21.pdf

[//]: # 'Переменные используемых технологий'

[tech-ts]: https://www.typescriptlang.org/

[tech-mongoose]: https://mongoosejs.com/

[tech-express]: https://expressjs.com/

[tech-winston]: https://github.com/bithavoc/express-winston

[tech-celebrate]: https://github.com/arb/celebrate

[tech-eslint]: https://eslint.org/
