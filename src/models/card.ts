import { model, Schema } from 'mongoose';
import validator from 'validator';

export type CardType = {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<CardType>({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  link: {
    type: String,
    required: true,
    validate: [validator.isURL, '{VALUE} не является валидным url\'ом'],
  },
  owner: {
    type: String,
    required: true,
    validate: [validator.isMongoId, '{VALUE} не является валидным ObjectId'],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<CardType>('Card', cardSchema);
