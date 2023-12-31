export enum ErrorText {
  // Length = '{#label} - параметр должен состоять из {#limit} символов',
  // DataUri = '{#label} - параметр должен быть валидным URL адресом',
  Email = '{#label} - параметр должен быть валидным email\'ом. {#value} не является валидным email\'ом',
  Required = '{#label} - параметр должен быть передан',
  Min = '{#label} - параметр должен быть длиной не менее {#limit} символов',
  Max = '{#label} - параметр должен быть длиной не более {#limit} символов',
  Empty = '{#label} - параметр не должен быть пустым',
  String = '#{label} - параметр должен быть строкой',
  Trim = '{#label} - параметр не должен начинаться или заканчиваться пробелом',
  Hex = '{#label} - параметр должен быть шестнадцатеричным строковым значением',
  HexAlign = '{#label} - параметр должен быть шестнадцатеричным декодированным значением, выровненным по байтам',
  ServerDefault = 'На сервере произошла ошибка',
  ServerUserNotFound = 'При поиске пользователей произошла ошибка',
  ServerUserCreate = 'При создании пользователя произошла ошибка',
  ServerId = 'Введен невалидный ID',
  ServerCardNotFound = 'При поиске карточек произошла ошибка',
  ServerCardDeleteNotFound = 'При удалении карточки произошла ошибка',
  ServerCardCreate = 'При создании карточки произошла ошибка',
  ServerCardLike = 'При попытке поставить лайк произошла ошибка',
  ServerCardDislike = 'При попытке убрать лайк произошла ошибка',
  ServerNotFound = 'Не удалось найти искомый элемент. Возможно, элемент отсутствует или удален',
  ServerPageNotFound = 'Не удалось получить доступ к запрашиваемому ресурсу. Возможно, он удален или не существует',
  ServerBadRequest = 'Передаваемая на сервер информация не соответствует ожидаемой',
  ServerEmailOrPassword = 'Неправильные почта или пароль',
  ServerRequestsAuth = 'Необходима авторизация',
  ServerAuthDeleteError = 'Можно удалять только карточки, которые были созданы вами',
  ServerValidationError = 'Validation Error'
}
