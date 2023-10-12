import { model, Schema } from 'mongoose';

export type UserType = {
  about: string;
  avatar: string;
  name: string;
}

const userSchema = new Schema<UserType>({
  about: {
    type: String,
    required: true,
    min: 2,
    max: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
});

export default model<UserType>('User', userSchema);
