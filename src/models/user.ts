import { Model, model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import InvalidAuthentication from '../errors/invalid-authentication';

import { UserType } from '../vendor/constants/user-type';
import { userDefaultData } from '../vendor/constants/user-default-data';

interface UserModel extends Model<UserType> {
  // eslint-disable-next-line интерфейс выдает ошибку no-unused-vars.
  findUserByCredentials(email: string, password: string): Promise<UserType>;
}

const userSchema = new Schema<UserType, UserModel>(
  {
    about: {
      type: String,
      min: 2,
      max: 200,
      default: userDefaultData.about,
    },
    avatar: {
      type: String,
      default: userDefaultData.avatar,
      validate: [validator.isURL, '{VALUE} не является валидным url\'ом'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, '{VALUE} не является валидным email\'ом'],
    },
    name: {
      type: String,
      min: 2,
      max: 30,
      default: userDefaultData.name,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    repeatPassword: {
      type: String,
    },
  },
  {
    statics: {
      findUserByCredentials(email: string, password: string) {
        return this
          .findOne({ email })
          .select('+password')
          .orFail(new InvalidAuthentication())
          .then((user) => bcrypt.compare(password, user.password)
            .then((matched: boolean) => {
              if (!matched) {
                throw new InvalidAuthentication();
              }

              return user;
            }));
      },
    },
  },
);

const User = model<UserType, UserModel>('User', userSchema);
export default User;
