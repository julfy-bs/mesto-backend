import { JwtPayload } from 'jsonwebtoken';
import { Model, model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import InvalidAuthentication from '../errors/invalid-authentication';

import userDefaultData from '../vendor/constants/user-default-data';

export type UserType = {
  readonly _id: string;
  token?: string | JwtPayload;
  about: string;
  avatar: string;
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

interface UserModel extends Model<UserType> {
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
          .then((user) => {
            return bcrypt.compare(password, user.password)
              .then((matched: boolean) => {
                if (!matched) {
                  throw new InvalidAuthentication();
                }

                return user;
              });
          });
      },
    },
  },
);

const User = model<UserType, UserModel>('User', userSchema);
export default User;
