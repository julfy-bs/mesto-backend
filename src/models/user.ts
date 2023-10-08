import { model, Schema } from 'mongoose';

type User = {
  about: string;
  avatar: string;
  name: string;
}

const userSchema = new Schema<User>({
  about: {
    type: String,
    required: true,
    min: 2,
    max: 200
  },
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
});

export default model<User>('User', userSchema);
