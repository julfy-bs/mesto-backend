import { UserType } from './user-type';

export const userDefaultData: Pick<UserType, 'name' | 'about' | 'avatar'> = {
  about: 'Исследователь',
  avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  name: 'Жак-Ив Кусто',
};

